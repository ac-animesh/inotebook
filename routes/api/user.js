const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express();
const User = require('../../models/User');

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter your valid email ID').isEmail(),
    check('password', 'Password must be more than 8 char').isLength({ min: 8 }),
  ],
  (req, res) => {
    // User validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = User(req.body);
    // user.save();
    res.send(user);
  }
);

module.exports = router;
