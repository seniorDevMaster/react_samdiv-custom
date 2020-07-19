// const Blog = require('../blog.model')
const Comment = require('../comment.model')
const UserComment = require('../usercomment.model');

exports.setComment = (req, res) => {
  console.log('----------', req.body)
  const { comment } = req.body
  const results = {}

  UserComment.create(comment, function(err, res) {
    if (err) throw err;
  });
}

exports.getBlogAndComment = (req, res) => {
  const { blogId } = req.body
  const results = {}

  Comment.find().where("_id", blogId).exec(function(err, blogs)
  {
    results.blogData = blogs
    UserComment.find().where("_id", blogId).exec(function(err, comment)
    {
      results.commentData = comment
      res.json(results);
    });
  });
}

exports.saveBlog = (req, res) => {
  const comments  = req.body;
  
  const commenttitle = comments.title;
  const commentdescription = comments.commentDes;
  const commentimage = comments.commentImage;
  const curDate = comments.curDate;
  const categories = 'updateTitle';
  Comment.findOne({ commenttitle })
    .then(content => {
      if (content==null) {
        Comment.create({ commenttitle, commentdescription, commentimage, categories, curDate })
        .then(() => res.json())
        .catch(err => console.log('create err ------------------', err))
      } else {
        Comment.findByIdAndUpdate(content._id, { commenttitle, commentdescription, commentimage, curDate})
          .then(() => res.json())
          .catch(err => console.log('update err ------------------', err))
      }
    })
    .catch(err => console.log('error ------------------', err))
}

exports.getBlog = (req, res) => {
 
  Comment.find({}, function(err, result){
    res.json(result);
  });

}