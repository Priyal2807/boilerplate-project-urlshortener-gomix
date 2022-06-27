require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns')
const bodyParser = require("body-parser")
// Basic Configuration
const port = process.env.PORT || 3000;

//autoIncrement.initialize(connection);

app.use(cors());
app.use(bodyParser.urlencoded({ extended:false }))
app.use('/public', express.static(`${process.cwd()}/public`));
let urlObj = {};
let key = 0;

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' });
});
app.post("/api/shorturl", (req, res) => {

    let reg = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|^www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    let url = new URL(req.body.url);
   
    let result = dns.lookup(url.hostname, (e, family) => {
        //console.log(result.hostname);
    })
    if (result.hostname==undefined || !reg.test(url)) {
        return res.send({ error: 'invalid url' });
    }
    if (result.hostname !== undefined) {
        key++;
        urlObj[key] = url;
        return res.send({ original_url: url, short_url: key });
    }

   
    
    

})
app.get("/api/shorturl/:id", (req, res) => {
    let url = urlObj[req.params.id];
    if (url === undefined)
        res.json({ error: 'invalid url' })
    else 
        return res.redirect(url);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
