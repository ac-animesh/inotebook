const express = require('express');

const router = express();

router.get('/', (req, res) => {
  // console.log(req.body);
  res.send('Welcome to Profile route');
});

module.exports = router;
