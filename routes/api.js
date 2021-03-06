var request = require('request');
var express = require('express');
var router = express.Router();
//var M2X = require("m2x");
//var m2x = new M2X("3882ef44cf7075f56ce6023e3d05db10");

router.get('/busRoutes', function(req, res) {
    var getUrl = 'http://159.203.212.140:3000/v1/ericsson/route'
    request(getUrl, function(err, getRes, body) {
        if (!err && getRes.statusCode == 200) {
            var busRoutes = JSON.parse(body);
            res.setHeader('Content-Type', 'application/json');
            res.send(busRoutes);
        }
    });
});

router.post('/riderAtStop/:stopId', function(req, res) {
    console.log('Logging rider at: ' + req.params.stopId);
    var postUrl = 'http://159.203.212.140:3000/v1/ericsson/route/' + req.params.stopId;
    console.log('posting to: ' + postUrl);
    request.post({url: postUrl }, function(err, postRes, body){
        var result = { success: false };
        if (!err && postRes.statusCode == 201) {
            //result = JSON.parse(body);
            result.success = true;
        } else {
            console.log(postRes.statusCode);
            console.log(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
    });
});

module.exports = router;
