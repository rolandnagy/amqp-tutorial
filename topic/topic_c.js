'use strict'

var amqp = require('amqplib/callback_api');
var config = require('../config');

var args = process.argv.slice(2);

if (args.length == 0) {
    console.log("Usage: node ./topic_c.js <source>.<branch>");
    process.exit(1);
}

amqp.connect(config.url, function (err, conn) {
    conn.createChannel(function (err, ch) {
        var ex = 'topic_logs';

        ch.assertExchange(ex, 'topic', {
            durable: false
        });

        ch.assertQueue('', {
            exclusive: true
        }, function (err, q) {
            console.log(' [*] Waiting for logs. To exit press CTRL+C');

            args.forEach(function (key) {
                ch.bindQueue(q.queue, ex, key);
            });

            ch.consume(q.queue, function (msg) {
                console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
            }, {
                noAck: true
            });
        });
    });
});