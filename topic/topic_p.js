var amqp = require('amqplib/callback_api');

amqp.connect(config.url, function (err, conn) {
    conn.createChannel(function (err, ch) {
        var ex = 'topic_logs';
        var args = process.argv.slice(2);
        var key = (args.length > 0) ? args[0] : 'anonymous.tech';
        var msg = args.slice(1).join(' ') || 'NEWS!';

        ch.assertExchange(ex, 'topic', {
            durable: false
        });
        ch.publish(ex, key, new Buffer(msg));
        console.log(" [x] Sent %s:'%s'", key, msg);
    });

    setTimeout(function () {
        conn.close();
        process.exit(0)
    }, 500);
});