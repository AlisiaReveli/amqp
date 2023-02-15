const amqp = require('amqplib');
const config = require('./config')
class Producer {
    async createChannel() {
        //step1 create a connection
        const connection = await amqp.connect(config.rabbitMQ.url);

        //step2 on connection created we are creating a channel
        //When you open a channel between two applications, you can use it to perform a variety of AMQP operations, such as publishing messages, subscribing to messages, and acknowledging messages.
        return connection.createChannel();
    }

    async PublishMessage(routingKey, message) {
        const channel = await this.createChannel();
        //step 3 create exchange
        //is like the post office that receives the message and figures out where it needs to go.
       channel.assertExchange(config.rabbitMQ.exchangeName, 'direct')
        //publish message
       channel.publish(config.rabbitMQ.exchangeName, routingKey, Buffer.from(JSON.stringify({
            logType: routingKey,
            message: message,
            dateTime: new Date()
        })))

        console.log(`Message was sent ${message}, to exchange ${config.rabbitMQ.exchangeName}`);
    }
}

module.exports = Producer;