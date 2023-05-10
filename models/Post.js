import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postSchema = new Schema({
  imageLink: String,
});

const Post = model('Post', postSchema);
export default Post;