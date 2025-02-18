import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: 'XjrFDYyGU5bHLinRQdXDm99JKNK2KXGE',
    socket: {
        host: 'redis-18501.c323.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 18501
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar 

