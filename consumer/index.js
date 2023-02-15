const amqp = require("amqplib");

async function consumeMessage() {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const exchange = 'aliceTest'
    await channel.assertExchange(exchange,'direct');
    const queueName = 'test';
    await channel.assertQueue(queueName);
        //create a binding between a queue and an exchange, which allows the queue to receive messages that are sent to the exchange with the specific routing key.
    await channel.bindQueue(queueName, exchange, 'info') //routing key info
    try {
        channel.consume(queueName, (message) => {
            console.log(`Received message: ${message.content.toString()}`);
        }, { noAck: true });
    } catch (e) {
        // handle errors here
        console.log(e)
    }
}

consumeMessage();