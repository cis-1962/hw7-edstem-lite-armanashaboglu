import express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import requireAuth from '../middlewares/require-auth';


const router = express.Router();

router.post('/signup', async (req, res, next) => {
    console.log('signup called');
    const { username, password } = req.body;
    console.log('username:', username, 'password:', password);
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      req.session!.userId = user._id.toString();
      res.status(201).send({ userId: user._id, username: user.username });
    } catch (error) {
      // res.status(400).send(error);
      next(error);
    }
  });

router.post('/login', async (req, res, next) => {
    console.log('login called');
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('invalid username or password');
    }
    console.log('login for ', username, ' successfull');
    req.session!.userId = user._id.toString();
    req.session!.username = user.username.toString();
    res.send({ userId: user._id, username: user.username });
  } catch (error) {
    next(error);
  }
});

router.post('/logout', requireAuth, (req, res) => {
    req.session = null;
    res.send('Logged out');
});

router.get('/', async (req, res, next) => {
    console.log('checking if logged in');
    try {
        if (req.session && req.session.userId) {
            res.send({userId: req.session.userId, username: req.session!.username})
        } else {
            res.status(400).send('user not logged in');
        }
    } catch (error) {
      // res.status(400).send(error);
      next(error);
    }
  });

export default router;