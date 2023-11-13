const express = require('express');
const { PORT } = require('./config');
const { dbConnection } = require('./database');
const  ExpressApp = require('./ExpressApp');

const StartServer = async() => {
    const app = express();
    await dbConnection();
    await ExpressApp(app);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
    .on('error', (err) => { 
        console.log('Server is not running', err);
        process.exit(1);
    })
}

StartServer();