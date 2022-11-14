const { createHash } = require('crypto');


const main = (newPassword) => {
    return createHash('sha256').update(newPassword).digest('hex');
}

console.log(main("0747260988malului"))