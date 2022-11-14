const {readFileSync, promises: fsPromises} = require('fs');
const { createHash } = require('crypto');

const hashedPassword = "b3e8d5fcecc11814f64f9d9601733e2386a19a758c4d4d0d053a62a6baabc1cc"

async function asyncReadFile(filename) {
    try {
      const contents = await fsPromises.readFile(filename, 'utf-8');
  
      const arr = contents.split(/\r?\n/);
    
      return arr;
    } catch (err) {
      console.log(err);
    }
  }

const main = async () => {
    const passwords = await asyncReadFile("./rockyou.txt")
    const start = Date.now()
    for (let password of passwords){
        let hash = createHash('sha256').update(password).digest('hex');
        if(hash == hashedPassword) {
            console.log("Password found! The password is ", `"${password}"`)
            break
        }
    }
    const end = Date.now()
    
    const durationInSeconds = (end - start) / 1000
    const guessesPerSecond =  passwords.length / durationInSeconds
    console.log(`The password was found in ${durationInSeconds}`)
    console.log("That's ", guessesPerSecond.toFixed(2), " per second")
}

main()


  

