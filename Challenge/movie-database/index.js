const express = require('express')
const app = express()
const port = 3000

// the root URL (/)
app.get('/', (req, res) => res.send('ok'))

app.listen(port, () => (console.log("app is running")));