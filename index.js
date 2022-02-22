const express = require("express");
const { exec } = require('child_process');

const app = express();
app.use(express.json());

const PORT =  5000;
const PRODUCTION_BRANCH = 'master';

app.post('/', (req, res) => {
	console.log('Recibo una request de Github...')
	const branch = req.body.ref.split('/')[2]
	
	console.log('Se hizo push en la rama', branch)
	if(branch === PRODUCTION_BRANCH) {
		exec('echo Realizo deploy...', (error, stdout, stderr) => {
			if (error) {
  		  console.error(`exec error: ${error}`);
  		  return;
  		}
  		console.log(stdout);
  		console.error(stderr);
		});
	}
	
	res.sendStatus(200);
})

app.listen(PORT, () => {
	console.log(`Webhook server running on port ${PORT}`);
})