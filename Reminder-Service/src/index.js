const express = require('express');
const dbConnect = require("./dbConnect");
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const cors = require("cors");
const app = express();

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
