const jwt = require('jsonwebtoken');

let playload = {
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true,
    "iat": 1600309070
}

let secret = 'secret';

let encrypt = jwt.sign(playload, secret);

/**
 * header: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 * playload: eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTYwMDMwOTA3MH0
 * sign: bjz4kCb7YwIGSYi9dxJ1uCjJIMeLkYUmtT3iJZorT0k
 */
console.log(encrypt);

let decrypt = jwt.verify(encrypt, secret);
console.log(decrypt);