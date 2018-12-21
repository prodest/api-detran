const vehicleService = require('../services/vehicleService');
const pushService = require('../services/pushService');

function vehicleNotFound(next) {
  const error = new Error('Veículo não encontrado.');
  error.userMessage = error.message;
  error.handled = true;
  error.status = 404;
  next(error);
}

module.exports = () => {
  var vehicleController = new Object();

  vehicleController.getData = (req, res, next) => {
    const plate = req.query.plate;
    const renavam = req.query.renavam;

    return vehicleService()
      .getDadosVeiculo(plate, renavam)
      .then(data => {
        if (!data.MARCA) {
          vehicleNotFound(next);
          return;
        }

        return res.json({
          model: data.MARCA.trim(),
          color: data.COR.trim()
        });
      })
      .catch(err => {
        next(err);
      });
  };

  vehicleController.getTickets = (req, res, next) => {
    const plate = req.query.plate;
    const renavam = req.query.renavam;

    return vehicleService()
      .getInfracoes(plate, renavam)
      .then(data => {
        // TODO: Find better way to do this
        // Check for vehicle not found
        if (data.length === 1 && !data[0].DataHoraAutuacao) {
          vehicleNotFound(next);
          return;
        }

        const resp = data
          .map(a => {
            return {
              description: a.DescricaoInfracao.trim(),
              classification: a.Natureza.trim(),
              points: +a.Pontos,
              place: a.LocalInfracao.trim(),
              district: a.NomeCidadeInfracao.trim(),
              date: a.DataHoraAutuacao
            };
          })
          .sort((a, b) => b.date.getTime() - a.date.getTime());

        return res.json(resp);
      })
      .catch(err => {
        next(err);
      });
  };

  vehicleController.sendPushTicket = (req, res, next) => {
    const plate = req.body.plate;
    // const renavam = req.body.renavam;
    const message = req.body.message;

    const defaultMessage = `Nova multa registrada para o veículo ${plate.toUpperCase()}`;

    vehicleService()
      .getUsersByVehiclePlate(plate)
      .then(usersToPush => {
        const pushData = {
          users: usersToPush,
          title: 'Detran',
          message: message ? message : defaultMessage,
          state: 'app.detranVehicles/:plate',
          stateParams: {
            plate: `${plate}`
          },
          icon: 'notification'
        };

        return pushService().sendPush(pushData);
      })
      .then(() => {
        console.log(`Notificação de multa para a placa ${plate} enviada com sucesso ao push server.\n`);
        return res.send('ok');
      })
      .catch(err => next(err));
  };

  return vehicleController;
};
