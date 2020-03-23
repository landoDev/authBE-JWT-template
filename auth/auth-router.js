const router = require("express").Router()
const Users = require("../users/users-model.js")

router.post("/register", (req, res) => {
  console.log('register endpoint')
  
})

router.post("/login", (req, res) => {
  console.log('login endpoint')
})

router.get("/logout", (req, res) => {
  console.log('logout endpoint')
})

module.exports = router
