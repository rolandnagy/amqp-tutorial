var amqp = require('amqplib/callback_api');
var config = require('../config');

amqp.connect(config.url, function (err, conn) {
    conn.createChannel(function (err, ch) {
        var ex = 'broadcast';
        var msg = process.argv.slice(2).join(' ') || 'This is a FANOUT. Which means that this message is sent out to every consumer!';

        ch.assertExchange(ex, 'fanout', {
            durable: false
        });
        ch.publish(ex, '', new Buffer(msg));
        console.log(" [x] Sent: %s", msg);
    });

    setTimeout(function () {
        conn.close();
        process.exit(0)
    }, 500);
});