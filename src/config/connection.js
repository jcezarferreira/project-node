const mongoose = require('mongoose');

const options = {
    autoIndex: false, 
    reconnectTries: 1, 
    reconnectInterval: 500, 
    poolSize: 2, 
    bufferMaxEntries: 0,
    bufferCommands: false,
    useNewUrlParser: true 
};


module.exports.generate = (conn) => {

    return new Promise((resolve, reject) => {
        if (conn && conn.db && conn.db.serverConfig
            && conn.db.serverConfig.isConnected()) return resolve(conn);

        mongoose.set('bufferCommands', false);

        mongoose.connection.on('error', (errorConnectingToDatabase) => {
            return reject(errorConnectingToDatabase);
        });

        mongoose.connect(process.env.MONGO_URL, options).then(() => {
            return resolve(mongoose.connection);
        });
    });
}
