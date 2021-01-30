// const t = "010001"
// const n = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'

//"d2f8c6aa02d26f0c89691a673e487bc0b7d9f621f01db74dbc5b9489ca1953c4d24a30d38ff848ce8f4744e56c6889035ba61c04df722f4a791ec088cae9dd52de1e511a86782db13e707f2b1f60585b7fc39253ef97f39f2d06ac2c44c30c6de826ac1356aea41bbe998784b4f4f80438787ac65edcae99f5fe4be4d0f64a04"
// firstKey = '0CoJUm6Qyw8W8jud'
// secondKey = "SbVzNcpHh0E9EaQU"
// encSecKey 和 secondKey 一一对应
const encSeckey = "d2f8c6aa02d26f0c89691a673e487bc0b7d9f621f01db74dbc5b9489ca1953c4d24a30d38ff848ce8f4744e56c6889035ba61c04df722f4a791ec088cae9dd52de1e511a86782db13e707f2b1f60585b7fc39253ef97f39f2d06ac2c44c30c6de826ac1356aea41bbe998784b4f4f80438787ac65edcae99f5fe4be4d0f64a04"

const crypto = require('crypto');

function encrypt(data, key) {
    const iv = "0102030405060708"
    let encryptedData = ''
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    cipher.setAutoPadding(true);
    encryptedData += cipher.update(data, 'utf8', 'base64')
    encryptedData += cipher.final('base64')
    return encryptedData;
}

const encryptParams = (params) => {
    const firstKey = '0CoJUm6Qyw8W8jud'
    const secondKey = "SbVzNcpHh0E9EaQU"
    return encrypt(encrypt(JSON.stringify(params), firstKey), secondKey)
}


/**
 * 解密
 * return utf8
 */
function decryption(data) {

    let key = AES_conf.key;
    let iv = AES_conf.iv;
    // let padding = AES_conf.padding;

    var cipherChunks = [];
    var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    decipher.setAutoPadding(true);
    cipherChunks.push(decipher.update(data, 'base64', 'utf8'));
    cipherChunks.push(decipher.final('utf8'));
    return cipherChunks.join('');
}

const hotMusic = {
    path: '/weapi/search/hot',
    params: { "type": "1111" }//固定的值
}
const searchSuggest = {
    path: '/weapi/search/suggest/keyword',
    params: {
        s: '又见'//关键词
    }
}
const search = {
    path: '/weapi/search/get',
    params: { "s": "又见炊烟", "limit": 20, "offset": 0, "type": 1, "strategy": 5, "queryCorrect": true }
}
const song = {
    path: '/weapi/song/enhance/player/url/v1',
    params: { "ids": "[227957]", "level": "standard", "encodeType": "aac" }
}
const lyric = {
    path: '/weapi/song/lyric',
    params: { "id": 227957, "lv": 0, "tv": 0 }
}

const https = require('https')
const querystring = require('querystring')
const zlib = require('zlib')
const request = (api) => {
    const req = https.request({
        hostname: 'interface.music.163.com',
        port: 443,
        path: api.path,
        method: 'POST',
        headers: {
            // ':authority': 'interface.music.163.com',
            // ':method': 'POST',
            // ':path': '/weapi/search/hot',
            // ':scheme': 'https',
            // 'accept': 'application/json, text/javascript',
            'accept-encoding': 'gzip, deflate, br',
            // 'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            // 'cache-control': 'no-cache',
            // 'content-length': encodedFormData.length,
            'content-type': 'application/x-www-form-urlencoded',
            // 'cookie': '_ntes_nnid=8f09ff93633f86347e6af526befddc0d,1611906002761; _ntes_nuid=8f09ff93633f86347e6af526befddc0d; NMTID=00OxdjUZo--r894hk_1ilnlUbM2eWsAAAF3TRWwAg; WEVNSM=1.0.0; WNMCID=snjcar.1611906002999.01.0; _iuqxldmzr_=33; JSESSIONID-WYYY=%2BrhA2z52vpe83yAXigmZtVfC3ke%5CWEg3DyDNAXBr3P%5CKx%2FCTFPJKpD41Ed7jsbAVmr%5COA%2BQYvwOz%5CuJfKFMnnhQIa9iTIgQ46nFcgOrx4qQtZ2wTTP7lqsaMGb4NADbAT%2F%2BgV9EgXGeqVWDgU0XaQttO%2Bk8znHz2r9HU9gxDG%2BU4c3MJ%3A1612009978280',
            // 'origin': 'https://y.music.163.com',
            // 'pragma': 'no-cache',
            // 'referer': 'https://y.music.163.com/',
            // 'sec-fetch-dest': 'empty',
            // 'sec-fetch-mode': 'cors',
            // 'sec-fetch-site': 'same-site',
            // 'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88',
        }
    }, response => {
        console.log(response.statusCode);
        const chunks = []
        let data
        response.on('data', (chunk) => {
            chunks.push(chunk)
        })
        response.on('end', () => {
            data = zlib.gunzipSync(Buffer.concat(chunks)).toString()
            console.log(data);
        })
    })
    const encryptedParams = encryptParams(api.params)
    const formData = {
        params: encryptedParams,
        encSecKey: encSeckey
    }
    const encodedFormData = querystring.encode(formData)
    req.write(encodedFormData)
    req.end()
}
request(hotMusic)
request(searchSuggest)
request(search)
request(song)
request(lyric)
