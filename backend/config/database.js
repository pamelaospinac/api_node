const mongoose = require('mongoose');
require('dotenv').config();

const URI = `mongodb+srv://${process.env.USER_BD}:${process.env.PASS_BD}@clusteradsoficha2557466.g1xltr1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=ClusterADSOFICHA2557466`
mongoose.connect(URI);

module.exports = mongoose;