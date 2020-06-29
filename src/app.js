const express = require ('express');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath)); 

app.post('/submit', (req, res) => {
   if(req.body.terms == 'on'){
       const data = JSON.stringify(req.body);
       fs.writeFile(`registration_${moment().format('DDMMYYYY')}
                    _${moment().format("HHmmss")}.json`, data, (err) => {
           if (err) {
                throw err;
            }
        console.log("JSON data is saved.");
        });
    }
    res.end()
  })

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 