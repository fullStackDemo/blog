const express = require('express');
const app = express();
const { exec } = require('child_process');
const fs = require('fs');

const port = 10086;

// 浏览器是否已经打开
let isBrowserOpening = true;
// function readFile() {
//     const rr = fs.createReadStream('./env');
//     return new Promise(resolve => {
//         rr.on('readable', () => {
//             const buffer = rr.read();
//             if (buffer) {
// 				const result = buffer.toString();
// 				resolve(result);
//             }
//         });
//     });
// }
// // 获取本地变量
// const getEnv = async function() {
//     const result = await readFile();
// 	isBrowserOpening = result;
// 	console.log('888', isBrowserOpening);
// };

const r1 = fs.readFileSync('./env');
isBrowserOpening = r1.toString();
console.log(9999, r1.toString());

// 打开浏览器
const openDefaultBrowser = url => {
    console.log(process.platform);
    switch (process.platform) {
        case 'win32':
            exec(`start ${url}`);
            break;
        default:
            exec('xdg-open', [url]);
            break;
    }
    fs.writeFile('./env', 'false', { flag: 'w+' }, err => {});
};

app.get('/', (req, res) => {
    res.jsonp({
        code: 88
    });
});

app.listen(port, () => {
    console.log(`app listening on %s`, port, isBrowserOpening, isBrowserOpening == true);
    if (JSON.parse(isBrowserOpening) == true) {
        openDefaultBrowser('http://localhost:10086');
        // exec('yarn server');
    }
});
