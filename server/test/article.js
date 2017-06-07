var chai = require('chai')
var chaiHttp = require('chai-http')
var should = chai.should()
var server = require('../app')
var articleModel = require('../models/article')
chai.use(chaiHttp)
var resultBeforeEach = {}

describe('Article', function() {
  beforeEach(function(done) {
    console.log("Create an article");
    articleModel.create({
      title : 'Title',
      content : 'Content',
      author : 'Author'
    }, function (err,result) {
      if (err) {
        console.log('Error on creating article with before-each method', err);
      } else if (result) {
        console.log('Succesfully created article with before-each method');
        resultBeforeEach = result
      }
    })
    done()
  })

  afterEach(function(done) {
    console.log("Delete an article");
    articleModel.deleteMany({},function(err) {
      if (err) {
        console.log('Failure to delete article with after-each method', err);
      } else {
        console.log('Succesfully delete article with after-each method');
      }
    })
    done()
  })

  describe('POST /api/article/', function() {
    it('Saved an article', function (done) {
      chai.request(server)
      .post('/api/article')
      .send({
        title : "Init Article",
        content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        author : "John Doe"
      })
      .end(function(res) {
        res.should.have.status(200)
        res.should.be.a('object')
        res.should.have.property('_id')
        res.should.have.property('title')
        res.should.have.property('content')
        res.should.have.property('author')
      })
      done()
    })
  })

  describe('GET /api/article', function() {
    it('List all article', function(done) {
      chai.request(server)
      .get('/api/article')
      .end(function(err,res) {
        res.should.have.status(200)
        res.should.be.a('object')
      })
      done()
    })
  })

  describe('PATCH /api/article/:id', function() {
    it('Update content of before-each article', function(done) {
      chai.request(server)
      .patch(`/api/article/${resultBeforeEach._id}`)
      .send({
        content : 'Updated Content'
      })
      .end(function(err,res) {
        res.should.have.status(200)
        res.should.have.not.status(500)
        res.content.should.equal('Updated Content')
        res.title.should.equal(resultBeforeEach.title)
        res.author.should.equal(resultBeforeEach.author)
      })
      done()
    })
  })

  describe('DELETE /api/article/:id',function() {
    it('Delete before-each article', function(done) {
      chai.request(server)
      .delete(`/api/article/${resultBeforeEach._id}`)
      .end(function(err,res) {
        res.should.have.status(200)
        res.should.be.a('object')
        res.should.have.property('msg')
      })
      done()
    })
  })

})
