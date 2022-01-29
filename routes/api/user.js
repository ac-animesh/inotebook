const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router = express();
const User = require('../../models/User');

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter your valid email ID').isEmail(),
    check('password', 'Password must be more than 8 char').isLength({ min: 8 }),
  ],
  async (req, res) => {
    // User validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ message: 'User is already exists' }] });
    }

    try {
      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // user.save();
      res.send(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
