// const Blog = require('../blog.model')
const Comment = require('../comment.model')
const UserComment = require('../usercomment.model');

exports.setComment = (req, res) => {
  const { comment } = req.body
  const results = {}

  UserComment.create(comment, function(err, result) {
    if (err) throw err;
    if (result) {
      _getBlogAndComment(comment.blogId, res)
    }
  });
}

exports.getBlogAndComment = (req, res) => {
  const { blogId } = req.body
  _getBlogAndComment(blogId, res)
}

function _getBlogAndComment(blogId, res) {
  const results = {}

  Comment.find().where("_id", blogId).exec(function(err, blogs)
  {
    results.blogData = blogs
  });
  UserComment.find().where("blogId", blogId).exec(function(err, comment)
  {
    results.commentData = comment
    console.log('blogId------------', comment, results)
    res.json(results);
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