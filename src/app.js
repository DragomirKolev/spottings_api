
import { app, handleExpressResponse } from './handlers/expressHandlers';
import { logReq } from './helpers/logging';

import spottingsHandlers from './handlers/spottingsHandlers';

app.get('/api/v1/spottings/:spottingId?', function (req, res) {
    logReq(req);
    const { spottingId } = req.params;
    handleExpressResponse(res, spottingsHandlers.get(spottingId));
});

app.post('/api/v1/spottings', function (req, res) {
    logReq(req);
    handleExpressResponse(res, spottingsHandlers.post(req.body));
});

app.delete('/api/v1/spottings', function (req, res) {
    logReq(req);
    handleExpressResponse(res, spottingsHandlers.delete());
});

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});