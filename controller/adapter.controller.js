const to = require('await-to-js').default;
const strategies = require('../config/strategy.config');
const axios = require('axios').default;

class AdapterController {

    async determineStrategy(req, res, next) {

        const tradingViewData = req.body;

        //TODO: add white IP list for tradingview ip's for MASTER version
        console.log("req.remoteAddress:");
        console.log(req.connection.remoteAddress);

        const currentStrategy = strategies.filter(strategy => strategy.strategy === tradingViewData.strategy);

        if (currentStrategy.length == 1) {

            const [sendRequestError, sendRequest] = await to(
                axios.post(`${currentStrategy.serverIp}:
                ${tradingViewData.mode === "master" ? currentStrategy.master_port : currentStrategy.development_port}/alert_data`, tradingViewData)
            )

            if (sendRequestError) {
                console.log(sendRequestError);
                return res.status(400).json(sendRequestError);
            }

            res.status(200).json(sendRequest.data);
        }
        else {
            return res.status(400);
        }
    }
}

module.exports = new AdapterController();