var amqp = require('amqplib/callback_api');
var config = require('../config');


amqp.connect(config.url, function (err, conn) {
    conn.createChannel(function (err, ch) {
        var ex = 'direct_messages';
        var args = process.argv.slice(2);
        var msg = args.slice(1).join(' ') || 'This message will be sent out to targeted consumers!';
        var person = (args.length > 0) ? args[0] : 'info';

        ch.assertExchange(ex, 'direct', {
            durable: false
        });
        ch.publish(ex, person, new Buffer(msg));
        console.log(" [x] Sent %s: '%s'", person, msg);
    });

    setTimeout(function () {
        conn.close();
        process.exit(0)
    }, 500);
});