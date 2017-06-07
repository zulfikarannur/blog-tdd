var articleModel = require('../models/article')
var ObjectId = require('mongodb').ObjectId;

var createArticle = function(req,res) {
  articleModel.create({
    title : req.body.title,
    content : req.body.content,
    author : req.body.author
  }, function(err,result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

var getArticle = function(req,res) {
  articleModel.find({}, function(err,result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

var updateArticle = function(req,res) {
  articleModel.findOne({
    _id : ObjectId(req.params.id)
  }, function(err, result) {
    if (err) {
      res.send(err)
    } else {
      result.content = req.body.content || result.content
      result.save(function(err,result) {
        if (err) {
          res.send(err)
        } else {
          res.send(result)
        }
      })
    }
  })
}

var deleteArticle = function(req,res) {
  articleModel.deleteOne({
    _id : ObjectId(req.params.id)
  }, function(err) {
    if (err) {
      res.send(err)
    } else {
      res.send({msg: "Delete success"})
    }
  })
}

module.exports = {
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle
};
