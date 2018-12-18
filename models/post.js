const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Post', new Schema(
  {
    title: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    creator: {
      type: Object,
      required: true
    },
  },
  { timestamp: true }
));

