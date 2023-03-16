const express = require("express");
const redis = require("redis");
// const process = require('process');

const app = express();
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});

const port = 8080;

console.log("web1: Connecting to the Redis...");
(async () => {
    await client.connect();

    conn.on('connect', () => {
        console.log('web1: CacheStore - Connection status: connected');
    });

    conn.on('end', () => {
        console.log('web1: CacheStore - Connection status: disconnected');
    });

    conn.on('reconnecting', () => {
        console.log('web1: CacheStore - Connection status: reconnecting');
    });

    client.on('error', (e) => {
        console.log(`web1: Redis Client Error: ${e}`)
    });
    await client.ping();
});


client.set("visits", 0);

app.get("/", (req, res) => {
    // process.exit(0);
    client.get("visits", (err, visits) => {
        res.status(200).json({
            message: "(web1) Number of visits is " + visits,
        });
        // res.send('Number of visits is: ' + visits);
        client.set("visits", parseInt(visits) + 1);
    });
});

app.listen(port, () => {
    console.log(`web1: Listening over ${port}`);
});
