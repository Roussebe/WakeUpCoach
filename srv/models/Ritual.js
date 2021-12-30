const mongoose = require('mongoose')

const RitualSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: false,
    default: "",
  },
  status: {
    type: String,
    default: 'public',
    enum: ['public', 'private'],
  },
  time: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  habits: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})


module.exports = mongoose.model('Ritual', RitualSchema)
