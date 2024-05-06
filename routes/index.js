var express = require('express');
var router = express.Router();
const userModel = require('./users');
const { search, route } = require('../app');

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/create', async function (req, res) {
  let userdata = await userModel.create({
    username: "Harshi",
    nickname: "harshiiiiiiii",
    description: "Hello everyone",
    categories: ['fashion', 'life', 'science']
  })
  res.send(userdata);
})

router.get('/delete', async function (req, res) {
  let userdata = await userModel.findOneAndDelete({ name: "Harsh Vardhan" })
  res.send(userdata);
})

// case insensitive search of harsh
router.get('/find', async function (req, res) {
  let regex = new RegExp("^harSH$", 'i')
  let data = await userModel.find({username:regex});
  res.send(data);
})

// router.get('/allusers', async function (req, res) {
//   let date1 = new Date('2024-04-01');
//   let date2 = new Date('2024-05-07');
//   let data = await userModel.find({dateCreated:{$gte:date1, $lte:date2}});
//   // let data = await userModel.find({categories:{$all:['fashion', 'science']}});
//   res.send(data);
// })


// search in document having specific length (it return nicknames having length >=0 and <=15)
router.get('/allusers', async function(req,res){
  let userdata = await userModel.find({
    $expr:{
      $and:[
        {$gte:[{$strLenCP:'$nickname'}, 0]},
        {$lte:[{$strLenCP:'$nickname'},15]}
      ]
    }
  })
  res.send(userdata);
})






router.get('/failed', function (req, res) {
  req.flash("age", 23)
  res.send("Ban gya");
});

router.get('/check', function (req, res) {
  let a = req.flash("age");
  console.log(a);
  res.send(a);
});

module.exports = router;
