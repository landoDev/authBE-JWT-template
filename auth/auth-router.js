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
  console.log('login endpoint')
})

router.get("/logout", (req, res) => {
  console.log('logout endpoint')
})

module.exports = router
