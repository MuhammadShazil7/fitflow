const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
    maxlength: [500, 'Comment cannot exceed 500 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
      maxlength: [1000, 'Post cannot exceed 1000 characters'],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [CommentSchema],
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Post', PostSchema);