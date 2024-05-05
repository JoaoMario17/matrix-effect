// simple express server to serve static files

import express from 'express';

const app = express();

app.use(express.static('public'));
app.use(express.static('package/scripts'));

app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
