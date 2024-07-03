const express = require('express');
const app = express();
const port = 8080;
const { exec } = require('child_process');

app.get('/', (req, res) => res.send('Even newer test'));

// Introduce a command injection vulnerability
app.get('/exec', (req, res) => {
    const command = req.query.cmd;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send(`Error: ${error.message}`);
        }
        res.send(`Output: ${stdout}`);
    });
});

app.listen(port);
console.log(`App running on http://localhost:${port}`);
