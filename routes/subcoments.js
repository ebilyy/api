var express = require('express');
var router = express.Router();

const controller = require('../controllers/comments');

router.post('/:id', (req, res) => {
  controller.addSubComment(req, res, next)
})
module.exports = router;