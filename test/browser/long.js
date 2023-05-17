var http = require('http');
var unbzip2Stream = require('../../');
var through = require('through');
var concat = require('concat-stream');
var test = require('tape');
var fs = require('fs');

test('http stream piped into unbzip2-stream results in original file content', function(t) {
    t.plan(1);


    http.get({path: '/test/fixtures/sample.bz2', responseType: "arraybuffer"}, function(res) {
        var startTime = new Date();
        res.pipe( unbzip2Stream() ).pipe(
            concat(function(data) {
                endTime = new Date();
                var timeDiff = endTime - startTime; //in ms
                // strip the ms
                timeDiff /= 1000;

                console.log('decompression took %f s', timeDiff);
                t.equal(data.length, 214435840);
            })
        );
    });
});
