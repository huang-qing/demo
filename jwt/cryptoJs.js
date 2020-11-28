const { HmacSHA224 } = require("crypto-js");
const CryptoJS = require("crypto-js");
const { Base64 } = require('js-base64');


let header = {
    "typ": "JWT",
    "alg": "HS256"
}
let playload = {
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true,
    "iat": 1600309070
}
let secret = 'secret';

function base64UrlEncode(str) {
    var encodedSource = CryptoJS.enc.Base64.stringify(str);
    var reg = new RegExp('/', 'g');
    encodedSource = encodedSource.replace(/=+$/, '').replace(/\+/g, '-').replace(reg, '_');
    return encodedSource;
}

//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
let headerEncode = Base64.encodeURL(JSON.stringify(header));
//eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTYwMDMwOTA3MH0
let playloadEncode = Base64.encodeURL(JSON.stringify(playload));
let encodedString = headerEncode + '.' + playloadEncode;
//此方法为HMAC-SHA256的签名方式  具体签名方法可以打印CryptoJS
let hash = CryptoJS.HmacSHA256(encodedString, secret);
//bjz4kCb7YwIGSYi9dxJ1uCjJIMeLkYUmtT3iJZorT0k
let signature = CryptoJS.HmacSHA256(encodedString, secret);
signatureEncode = base64UrlEncode(signature);


//正确
console.log(headerEncode);
//正确
console.log(playloadEncode);
//不正确，不知道怎么弄
console.log(signatureEncode);

