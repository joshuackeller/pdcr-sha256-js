const { createHash } = require('crypto');


const main = (newPassword) => {
    return createHash('sha256').update(newPassword).digest('hex');
}

console.log(main("colosalacristi"))

// password - 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
// colosalacristi - 12e3cccd824622dc43885e0a227cc1b8fc8ce9e5244f6a79c46dec048e3c52e3