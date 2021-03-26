const express = require('express')
const app = express()
const port = 12800

app.get('/', (req, res) => {
  res.send('Welcome to the Assignment Webserver')
})

app.listen(port, () => {
  console.log(`Assignment Webserver listening at http://localhost:${port}`)
})
