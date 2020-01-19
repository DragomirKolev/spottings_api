import MongoClient from 'mongodb';
const url = 'mongodb://localhost:27017';

let clientCache;

function getClient() {
    if (clientCache != null)
        return Promise.resolve(clientCache);

    const options = { useNewUrlParser: true, useUnifiedTopology: true};
    return MongoClient.connect(url, options).then((client) => {
        console.log(`got client on url (${url})`);
        return Promise.resolve(client);
    }).catch((err) => {
        console.log("error connecting to database", err);
        return Promise.reject(err);
    });;
}

function getCollection(name) {
    return getClient().then((client) => {
        const db = client.db("birdspotters");
        const collection = db.collection(name);
        console.log();
        return Promise.resolve(collection);
    })
}

export default {
    getCollection
}