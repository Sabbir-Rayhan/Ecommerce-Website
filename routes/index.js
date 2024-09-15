var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usermodel = require('./users');
const autho = require('./author');
const Homepage = require('./Homepage_pro');
const cookieParser = require('cookie-parser');

// Use cookie parser middleware
router.use(cookieParser());



router.get('/mahee',function(req,res){
  res.render('mahee');
})

/* GET home page. */
router.get('/', async function(req, res, next) {
  const token = req.cookies.token;
  let user1 = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, 'mahee');
      user1 = decoded;
    } catch (err) {
      // Handle token verification error
    }
  }

  let homepro = await Homepage.find();

  res.render('index', { title: 'KTyre', user1, homepro, originalUrl1: req.originalUrl });
});

router.get('/login', function(req, res, next) {
  const returnTo = req.query.returnTo || '/';
  res.render('Login', { returnUrl: returnTo });
});

router.get('/register', function(req, res, next) {
  const returnTo = req.query.returnTo || '/';
  res.render('register', { returnUrl: returnTo });
});

router.get('/Product_/:pid', async function(req, res, next) {
  let product = await usermodel.find();
  const token = req.cookies.token;
  let user1 = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, 'mahee');
      user1 = decoded;
    } catch (err) {
      // Handle token verification error
    }
  }
  res.render(`Product_${req.params.pid}`, { mahee: product, user1, originalUrl: req.originalUrl });
});

router.get('/productdetails/:id', async function(req, res, next) {
  let product = await usermodel.find();
  let pro = await usermodel.findOne({ _id: req.params.id });
  const token = req.cookies.token;
  let user1 = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, 'mahee');
      user1 = decoded;
    } catch (err) {
      // Handle token verification error
    }
  }
  res.render('productDetails', { Rayhan: pro, user1, mahee: product, originalUrl: req.originalUrl });
});

router.get('/addproduct', function(req, res, next) {
  res.render('Addproduct');
});

router.get('/admin', function(req, res, next) {
  let token = req.cookies.token
  if (token) {
    try {
      const decoded = jwt.verify(token, 'mahee');
      user1 = decoded;
    } catch (err) {
      // Handle token verification error
    }
  }
  res.render('Admin',user1);
});

router.post('/create', async function(req, res, next) {
  let { producttype, title, size, image, price } = req.body;

  let createduser = await usermodel.create({
    producttype, title, size, image, price
  });
  res.redirect('/success');
});

router.get('/success', (req, res) => {
  res.render('success');
});

router.post('/create-homepage', async function(req, res, next) {
  let { producttype, imageurl } = req.body;

  let homeproduct = await Homepage.create({
    producttype, imageurl
  });
  res.redirect('/');
});

// Authentication and Authorization
router.post('/create2', function(req, res, next) {
  let { username, email, password, mobile, address } = req.body;
  const returnTo = req.body.returnTo || '/';

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, async function(err, hash) {
      let createduser = await autho.create({
        username, email, password: hash, mobile, address
      });
      res.redirect(`/login?returnTo=${encodeURIComponent(returnTo)}`);
    });
  });
});

router.get('/logout', function(req, res) {
  res.cookie('token', "", { expires: new Date(0) });
  res.redirect('/');
});

router.post('/login', async function(req, res) {
  let em = await autho.findOne({ email: req.body.email });
  if (!em) return res.send("Something went wrong");

  bcrypt.compare(req.body.password, em.password, function(err, result) {
    if (result) {
      let token = jwt.sign({
        username: em.username, email: em.email, address: em.address,
        mobile: em.mobile
      }, 'mahee');
      res.cookie('token', token);

      const returnTo = req.body.returnTo || '/';
      if (em.email == 'Admin56@gmail.com') {
        res.redirect('/admin');
      } else {
        res.redirect(returnTo);
      }
    } else {
      res.send("Something is Wrong");
    }
  });
});

router.get('/payment', (req, res) => {
  const token = req.cookies.token;
  let user1 = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, 'mahee');
      user1 = decoded;
    } catch (err) {
      return res.redirect('/login'); // Redirect to login if token verification fails
    }
  } else {
    return res.redirect('/login'); // Redirect to login if no token found
  }
  const rayhan = req.query;
  res.render('payment', { user1, rayhan });
});

module.exports = router;
