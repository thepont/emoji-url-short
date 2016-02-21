const spawn = require('child_process').spawn;

function hash(url){
    return new Promise((resolve, reject) => {
        const hashmoji = spawn('python3', ['/usr/local/bin/hashmoji.py']);
        var hash ='';
        console.log('IM HERE'); 
        hashmoji.stdout.on('data', (data)=>{
            return resolve(data.toString().replace(/(\s)/gm,""));
        });
        hashmoji.stderr.on('data', (data)=>{
            console.log('err', data);
            return reject(data).toString();
        });

        hashmoji.stdin.write(url)
        hashmoji.stdin.end(); 
    });
}

module.exports = hash;

var test = hash('https://www.google.com');
test.then((data)=>{console.log('hash test :',data)}).catch((err)=>{console.err(err)});
