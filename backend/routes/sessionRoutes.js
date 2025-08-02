const express = require('express');
const Session = require('../models/Session');
const User = require('../models/User');
const auth = require('../utils/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const sessions = await Session.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(sessions);
});

router.get('/:id', auth, async (req, res) => {
  const session = await Session.findOne({ _id: req.params.id, userId: req.user.id });
  if (!session) return res.status(404).json({ msg: 'Session not found' });
  res.json(session);
});

router.post('/', auth, async (req, res) => {
  const { chatHistory, jsxCode, cssCode } = req.body;
  const session = new Session({ userId: req.user.id, chatHistory, jsxCode, cssCode });
  await session.save();

  await User.findByIdAndUpdate(req.user.id, { $push: { sessions: session._id } });
  res.json(session);
});

router.put('/:id', auth, async (req, res) => {
  const { chatHistory, jsxCode, cssCode } = req.body;
  const session = await Session.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { chatHistory, jsxCode, cssCode },
    { new: true }
  );
  res.json(session);
});

module.exports = router;
