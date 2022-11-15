const {readFileSync, promises: fsPromises} = require('fs');
const { createHash } = require('crypto');
const Parallel = require("paralleljs")

const hashedPassword = "12e3cccd824622dc43885e0a227cc1b8fc8ce9e5244f6a79c46dec048e3c52e3"

async function asyncReadFile(filename) {
    try {
      const contents = await fsPromises.readFile(filename, 'utf-8');
  
      const arr = contents.split(/\r?\n/);
    
      return arr;
    } catch (err) {
      console.log(err);
    }
  }

function getPassword (passwords) {
  for (const password of passwords){
    let hash = createHash('sha256').update(password).digest('hex');
    if(hash == hashedPassword) {
        console.log("Password found! The password is ", `"${password}"`)
        return password
    }
  }
}

const main = async () => {
    const passwords = await asyncReadFile("./rockyou.txt")
    const start = Date.now()

    const p = new Parallel(passwords)

    p.spawn(data => {
      return getPassword(data)
    }).then( data => console.log(data))

    const end = Date.now()
    
    const durationInSeconds = (end - start) / 1000
    const guessesPerSecond =  passwords.length / durationInSeconds
    console.log(`The password was found in ${durationInSeconds} seconds`)
    console.log("That's ", guessesPerSecond.toFixed(2), " per second")
}

main()


  

