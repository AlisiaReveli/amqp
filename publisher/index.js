const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Producer = require('./producer.js');
const producer = new Producer();
app.use(bodyParser.json("application/json"));

app.post("/sendLog", async (req, res) => {
    await producer.PublishMessage(req.body.routingKey, req.body.message);
    res.send();
});
app.listen(3000, () => {
    console.log('server started')
})