// const Blog = require('../blog.model')
const Comment = require('../comment.model')
const UserComment = require('../usercomment.model');

exports.setComment = (req, res) => {
  const { comment } = req.body

  UserComment.count({}, function(error, numOfDocs){
    if(error) return callback(error);

    // set the data sequence
    comment.selfId = numOfDocs + 1

    UserComment.create(comment, function(err, result) {
      if (err) throw err;
      if (result) {
        _getBlogAndComment(comment.blogId, res)
      }
    });
  });
}

exports.getBlogAndComment = (req, res) => {
  const { blogId } = req.body
  _getBlogAndComment(blogId, res)
}

function _getBlogAndComment(blog_id, res) {
  const results = {}

  Comment.find().where("_id", blog_id).exec(async function(err, blogs)
  {
    results.blogData = blogs
    const getCommentTree = (blogId, parentId)=>{
      return new Promise(async (resolve, reject)=>{
        const ret = []
        UserComment.find().where({blogId, parentId}).exec(async function(err, comments){
          if(err) {
            resolve([])
          } else {
            if (comments.length > 0){
              for(const comment of comments){
                const children = [...await getCommentTree(blogId, comment.selfId)]
                ret.push({ ...comment._doc, children})
              }  
            }
            resolve(ret)
          }
        })
      })
    } 
    const resJson = await getCommentTree(blog_id, 0);

    results.commentData = resJson
    res.json(results)
  });
}

exports.insertBlog = (req, res) => {
  const comments  = req.body;
  
  const commenttitle = comments.title;
  const commentdescription = comments.commentDes;
  const commentimage = comments.commentImage;
  const curDate = comments.curDate;

  Comment.findOne({ commenttitle })
    .then(content => {
      if (content==null) {
        Comment.create({ commenttitle, commentdescription, commentimage, curDate })
          .then(() => res.json('success'))
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