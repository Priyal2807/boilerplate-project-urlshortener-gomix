require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns')
const bodyParser = require("body-parser")
// Basic Configuration
const port = process.env.PORT || 3000;
let key = 1;
let urlObj = {}
app.use(cors());
app.use(bodyParser.urlencoded({ extended:false }))
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' });
});
app.post("/api/shorturl", (req, res) => {
    const { hostname } = new URL(req.body.url);
    //console.log(hostname);

   let result = dns.lookup(hostname, (err, add, fam) => {
   })
    if (Object.values(result).length !== 0) {
        if (!Object.values(urlObj).includes(req.body.url)) {
            urlObj[key] = req.body.url;
            let a = key;
            key++;
            res.send({ original_url: req.body.url, short_url: a })
        }
    }
    else {
        res.send({error:'invalid url'})
    }
    
})
app.get("/api/shorturl/:id", (req, res) => {
    let url = urlObj[req.params.id];
    return res.redirect(url);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
