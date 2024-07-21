const express = require('express');

const { ServerConfig } = require('./config');
const { rateLimit } =require('express-rate-limit');
const apiRoutes = require('./routes');
const cors = require("cors");
const app = express();
const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, 
	limit: 5, 
	
})
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
