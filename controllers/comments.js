const Comment = require('../models/comments');

const createComment = (req, res, next) => {
  let comment = new Comment(
    {
      author: req.body.author,
      time: req.body.time,
      text: req.body.text,
      state: req.body.state,
      parent_id: req.body.parent,
      sub_comments: []
    }
  );

  comment.save((err, data) => {
    if (err) {
      return next(err);
    }
    res.statuscode = 200;
    console.log(data, 'data');
    res.json(data)
  })
}

const updateComment = (req, res, next) => {
  const id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body)
}

const deleteComment = (req, res, next) => {

  const recursiveDelete = (elem, parent) => {
    if (!elem) return;

    if (!elem.sub_comments.length) {
      elem.remove()
      recursiveDelete(parent)
    } else {
      parent = elem;
      recursiveDelete(findElem(elem.sub_comments[0]._id), parent);
    }
  }


  const findElem = (id) => {
    Comment.findById(id).populate({ path: 'sub_comments' })
      .exec((err, doc) => {
        return doc;
      })
  }

}

const getComment = (req, res, next) => {
  Comment.findById(req.params.id).exec((err, doc) => {
    if (err) return next(err);
    res.json(doc);
  })
}
const getAllComments = (req, res, next) => {

  // three levels of nesting is the maximum
  // need more time to fix this
  Comment.find({}).populate({
    path: 'sub_comments',

    populate: { path: 'sub_comments' }
  }).exec((err, comments) => {
    if (err) return next(err);
    const filtered = comments.filter((el) => el.parent_id ? false : true);
    const json = JSON.stringify(filtered)
    res.send(json);
  })

}

const addSubComment = (req, res, next) => {
  const id = req.params.id;
  // console.log(req.body.author);
  const child = new Comment({
    author: req.body.author,
    time: req.body.time,
    text: req.body.text,
    state: req.body.state,
    parent_id: id,
    sub_comments: []
  })


  child.save((err, data) => {
    if (err) return next(err);
    // console.log(data);
    // res.json(data)
    const parentComment = Comment.findById(id, (err, doc) => {
      if (err) return next(err);
      doc.sub_comments.push(child);
      doc.save((err) => {
        if (err) return next(err);
        res.statuscode = 200;
        res.json(doc)
      })
    })
  })

}

module.exports = { createComment, updateComment, deleteComment, getComment, getAllComments, addSubComment }