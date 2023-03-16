const express = require('express');
const path = require('path');

const app = express();
const clientRoot = path.resolve(__dirname, '../client');
const uploadRoot = path.resolve(__dirname, '../upload');

app.use(express.static(clientRoot));

app.use(express.static(uploadRoot));

app.use('/api/upload', require('./routes/upload'));

app.use(require('./middleware/handleError'));

app.listen(9000, () => {
	console.log('opened server on', 9000);
});
