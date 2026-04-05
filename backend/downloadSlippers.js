const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, '../frontend/public/images/slippers');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const options = Object.assign(new URL(url), {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
        });

        https.get(options, (res) => {
            if (res.statusCode === 200) {
                const stream = fs.createWriteStream(filepath);
                res.pipe(stream);
                stream.on('finish', () => {
                    stream.close();
                    resolve();
                });
            } else if (res.statusCode === 301 || res.statusCode === 302) {
                downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
            } else {
                reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
            }
        }).on('error', err => reject(err));
    });
};

const urls = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Flip-flops_of_natural_rubber.jpg/800px-Flip-flops_of_natural_rubber.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Slippers%2C_Japan.jpg/800px-Slippers%2C_Japan.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Hotel_slippers.jpg/800px-Hotel_slippers.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Shoes-clogs%2C_Morocco.jpg/800px-Shoes-clogs%2C_Morocco.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Zoccoli_in_pelle.jpg/800px-Zoccoli_in_pelle.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Geta_Japan.jpg/800px-Geta_Japan.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Slippers_in_the_Philippines.jpg/800px-Slippers_in_the_Philippines.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Roman_sandals.jpg/800px-Roman_sandals.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Felt_slippers.jpg/800px-Felt_slippers.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Pair_of_slippers_with_flower.jpg/800px-Pair_of_slippers_with_flower.jpg"
];

const downloadAll = async () => {
    console.log('Downloading 10 Slipper Images instantly from Wikipedia...');
    for (let i = 0; i < urls.length; i++) {
        const filepath = path.join(dir, `slp${i + 1}.jpg`);
        try {
            console.log(`Downloading slp${i + 1}.jpg ...`);
            await downloadImage(urls[i], filepath);
            console.log(`Successfully saved slp${i + 1}.jpg!`);
        } catch (e) {
            console.error(`Failed slp${i+1}: ${e.message}`);
        }
    }
    console.log('Done!');
};

downloadAll();
