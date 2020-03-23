const bc = require('bcryptjs')
const router = require("express").Router()
const Users = require("../users/users-model.js")

router.post("/register", (req, res) => {
  console.log('register endpoint')
  // 1- pull credentials from body
  const { username, password } = req.body
  // 2- make a hash using bcrypt
  //        - import the lib
  //        - use the lib
  //        - hashSync takes raw password and the number of rounds
  const hashedPassword = bc.hashSync(password, 10) // 2 ^ 10
  // 3- we will save { username, password (hashed) } into db
  Users.add({
    username,
    password: hashedPassword,
  })
    .then(data => {
      console.log(data)
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: `Something went really poorly` })
    })
  // 4- we can json back to the client whatever, res.end, res.send, res.json
})

router.post("/login", (req, res) => {
  // 1- pull creds from requ
  const { username, password } = req.body
  // 2- check creds using bcrypc - we need the hash from the db
  Users.findBy({ username }).first()
    .then(user => {
      if (user && bc.compareSync(password, user.password)) {
        // this means the username exists in the db AND password good
        // now we can save a session for this particular login
        req.session.user = user
        // this response is setting Set-Cookie:sessionId=blablabla
        res.json({ message: `Welcome, ${user.username}! Here is a cookie` })
      } else {
        // this means the username does not exist
        res.status(401).json({ message: 'Invalid credential' })
      }
    })
    .catch(err => {
      console.log(err)
    })
  // 3- create session by taking info to req.session
  // THE END

})

router.get("/logout", (req, res) => {
  console.log('logout endpoint')
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.json({ message: 'Sorry, you can not leave' })
      } else {
        res.json({ message: 'good bye' })
      }
    })
  }
})

module.exports = router
