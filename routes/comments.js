var express = require('express');
var router = express.Router();

const controller = require('../controllers/comments');

router.get('/', function (req, res, next) {
  controller.getAllComments(req, res, next)
});
router.post('/', function (req, res, next) {
  controller.createComment(req, res, next)
});
router.post('/:id', function (req, res, next) {
  console.log(req.body);
  // res.json(req.body)
  controller.addSubComment(req, res, next)
});
router.put('/:id', function (req, res, next) {
  controller.updateComment(req, res, next)
});
router.delete('/:id', function (req, res, next) {
  controller.deleteComment(req, res, next)
});

module.exports = router;
