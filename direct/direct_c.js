var amqp = require('amqplib/callback_api');
var config = require('../config');

var args = process.argv.slice(2);

if (args.length == 0) {
    console.log("Usage: node ./direct_c.js [new-york-times] [wall-street-journal] [guardian]");
    process.exit(1);
}

amqp.connect(config.url, function (err, conn) {
    conn.createChannel(function (err, ch) {
        var ex = 'direct_messages';

        ch.assertExchange(ex, 'direct', {
            durable: false
        });

        ch.assertQueue('', {
            exclusive: true
        }, function (err, q) {
            console.log(' [*] Waiting for news. To exit press CTRL+C');

            args.forEach(function (person) {
                ch.bindQueue(q.queue, ex, person);
            });

            ch.consume(q.queue, function (msg) {
                console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
            }, {
                noAck: true
            });
        });
    });
});