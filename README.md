# AMQP examples

In this repository you'll find examples to 3 kind of exchange types:

 * direct
 * topic
 * fanout

It uses [ampqlib](https://www.npmjs.com/package/amqplib) which is a library and client fot Node.JS.


## Usage

### Direct exchange:

Run the number of consumers you'd like running the following command:
```javascript
node ./direct/direct_c.js [ny-times] [wall-street-journal] [guardian] [any-name-you-like]
```

Then just run your producer and have fun:
```javascript
node ./direct/direct_p.js [some-name-whihc-you-gave-to-the-consumer] "message"
```

### Topic exchange:

Run the number of consumers you'd like running the following command (The parameters are routing keys. * matches a word and # matches zero or more words):
```javascript
node ./topic/topic_c.js "anonym.*" "*.info"
```
```javascript
node ./topic/topic_c.js "#"
```
```javascript
node ./topic/topic_c.js "anonym.*"
```
```javascript
node ./topic/topic_c.js "anonym.info"
```

Then just run your producer and have fun:
```javascript
node ./topic/topic_p.js "routing.key" "message"
```

### Fanout exchange:

Run the number of consumers you'd like running the following command:
```javascript
node ./fanout/fanout_c.js
```

Then just run your producer and have fun:
```javascript
node ./fanout/fanout_p.js "message"
```

