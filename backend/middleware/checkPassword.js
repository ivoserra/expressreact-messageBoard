
let random = "123"

setInterval(()=>{ 
  random = String(Math.round(Math.random() * 100)) 
}, 1000*30);

console.log(random)


function checkPassword(req, res, next) {
  // Get header with the key "Authorization"
  const password = req.get("Authorization")

  // Check header value against hardcoded password


  if (password != random ) {
    console.log(random)
    // If pw didn't match, send error message
    res.status(401).send({ error: "Invalid password" })
    
    return
  }

  // Proceed to next middleware
  next()
}

export default checkPassword
