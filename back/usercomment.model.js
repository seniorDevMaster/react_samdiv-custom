const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Data we need to collect/confirm to have the app go.
const fields = {
  blodId: {
    type: String
  },
  parentId: {
    type: String
  },
  childId: {
    type: String
  },
  userName: {
    type: String
  },
  email: {
    type: String
  },
  avatarUrl: {
    type: String
  },
  content: {
    type: String
  }
}

// One nice, clean line to create the Schema.
const usercommentSchema = new Schema(fields)

module.exports = mongoose.model('usercomment', usercommentSchema)