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
  const hashedPassword = bc.hashSync()
  // 3- we will save { username, password (hashed) } into db
  // 4- we can json back to the client whatever, res.end, res.send, res.json
})

router.post("/login", (req, res) => {
  console.log('login endpoint')
})

router.get("/logout", (req, res) => {
  console.log('logout endpoint')
})

module.exports = router
