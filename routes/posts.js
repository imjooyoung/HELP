var express = require('express');
var router = express.Router();
var Post = require('../models/Posts');
    User = require('../models/Users');

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}

function validateForm(form) {
  var title = form.title || "";
  var explanation = form.explanation || "";
  var address = form.address || "";
  var rule = form.rule || "";
  var price = form.price || "";
  var city = form.city || "";

  if (!title) { 
    return '제목을 입력해주세요.'; 
  }
  if (!explanation) { 
    return '설명을 입력해주세요.'; 
  }
  if (!address) { 
    return '주소를 입력해주세요.'; 
  }
  if (!city) { 
    return '도시를 입력해주세요.'; 
  }
  if (!rule) { 
    return '이용 규칙을 입력해주세요.'; 
  }
  if (!price) { 
    return '가격을 입력해주세요.'; 
  }

  return null;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find('/',function(err, posts){
     if(err){
       return next(err);
     }
     res.render('posts/index', { post: post });
   });
});

router.get('/new', needAuth, function(req, res, next) {
  res.render('posts/new', {messages: req.flash()});
});


router.get('/:id/edit',function(req, res, next){
    // id가 일치하는 post를 찾아 edit하기
    Post.findById({_id: req.params.id},function(err,post){
        if (err) {
            return next(err);
        }
        res.render('posts/edit',{ post: post });
    });
});

router.post('/', needAuth, function(req, res, next){
  var err = validateForm(req.body);
  Post.find({}, function (err, post) {
    if (err) {
      return next(err);
    }
  var posts = new Post({
      user: req.user._id,
      userName: req.user.name,
      title: req.body.title,
      explanation: req.body.explanation,
      room: req.body.room,
      type: req.body.type,
      guest: req.body.guest,
      city: req.body.city,
      address: req.body.address,
      accommodation: req.body.accommodation,
      rule: req.body.rule,
      price: req.body.price
    });

    posts.save(function (err) {
      if (err) {
        return next(err);
      } else {
        res.redirect('/posts');
      }
    });
  }); 
});

router.delete('/:id', function(req, res, next) {
    // id가 일치하는 post를 찾아 지운 후 /posts로 돌아간다.
    Post.findOneAndRemove({_id: req.params.id}, function(err) {
        if (err) {
        return next(err);
        }
        res.redirect('/posts', { post: post });
    });
});


module.exports = router;
