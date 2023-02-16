//init expression
var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    request = require('request'),
    cheerio = require('cheerio'),
    app = express(),
    bodyParser = require('body-parser'),
    env = process.env;

//this application must support the parsing of json type to post data
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

//use the client folder for static client-side 
app.use(express.static(path.join(__dirname, 'client')));

app.post('/scrape', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    //create a request to the url provided in the post request
    request(req.body.url, function (error, response, responseHtml) {
        var resObject = {};

        //throw in case of error
        if (error) {
            res.end(JSON.stringify({error: 'There has been an error'}));
            return;
        }

        //init cheerio
        resObject = {},
        $ = cheerio.load(responseHtml),
        $title = $('head title').text(),
        $desc = $('meta[name="description"]').attr('content'),
        $kwd = $('meta[name="keywords"]').attr('content');

        if($title) {
            resObject.title = $title;
        }

        if($desc) {
            resObject.description = $desc;
        }

        if($kwd) {
            resObject.keywords = $kwd;
        }

        //send response
        res.end(JSON.stringify(resObject));
    });
});

//listener for HTTP request
app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost');
console.log('Navigate your brower to: http://localhost:3000');