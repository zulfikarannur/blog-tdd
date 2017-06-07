var express = require('express');
var router = express.Router();
var articleControllers = require('../controllers/articleControllers')

//Update article content
router.patch('/:id', articleControllers.updateArticle)

//Delete article
router.delete('/:id', articleControllers.deleteArticle)

//Get article
router.get('/',articleControllers.getArticle)

//Create article
router.post('/', articleControllers.createArticle)

module.exports = router;
