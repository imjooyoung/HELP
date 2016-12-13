var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  user: {type: Schema.Types.ObjectId, required: true},
  userName: {type: String, required: true},
  title: {type: String, required: true},
  explanation: {type: String, required: true},
  room: {type: String, required: true},
  type: {type: String, required: true},
  guest: {type: Number, required: true},
  city: {type: String, required: true},
  address: {type: String, required: true},
  accommodation:{type: String, required: true},
  rule:{type: String, required: true},
  price:{type: Number, required: true},
  createdAt: {type: Date, default: Date.now},
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Post = mongoose.model('Post', schema);

module.exports = Post;