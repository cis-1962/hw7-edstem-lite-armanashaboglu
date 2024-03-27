import express from 'express';
import Question from '../models/question';
import requireAuth from '../middlewares/require-auth';

const router = express.Router();

// getting all questions
router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.find();
    res.send(questions);
  } catch (error) {
    next(error);
  }
});

router.post('/add', requireAuth, async (req, res, next) => {
  const { questionText } = req.body;
  const author = req.session!.userId;
  try {
    const question = new Question({ questionText, author });
    await question.save();
    res.status(201).send(question);
  } catch (error) {
    next(error);
  }
});

router.post('/answer', requireAuth, async (req, res, next) => {
  const { _id, answer } = req.body;
  try {
    const question = await Question.findByIdAndUpdate(_id, { answer }, { new: true });
    if (!question) {
      return res.status(404).send('Question not found');
    }
    res.send(question);
  } catch (error) {
    next(error);
  }
});

export default router;
