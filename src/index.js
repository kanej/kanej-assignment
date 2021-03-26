const express = require('express')
const app = express()
const { createProxyMiddleware } = require('http-proxy-middleware')
const port = 12800

const IPFS_ENDPOINT = 'http://localhost:5001'

app.use(
  '/api',
  createProxyMiddleware({
    target: IPFS_ENDPOINT,
  }),
)

app.get('/', (req, res) => {
  res.send('Welcome to the Assignment Webserver')
})

app.listen(port, () => {
  console.log(`Assignment Webserver listening at http://localhost:${port}`)
})
