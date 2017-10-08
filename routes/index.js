var express = require('express');
var router = express.Router();
var languageTranslator = require('../Utilities/Watson/Translation');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
  const lang = req.query.lang || 'en';
  let text = {
    welcome: "Welcome, Watson",
    upload: "Upload",
  };

  lang === 'en' 
    ? res.render('home', { title: 'FinShark', text: text })
    : objTranslator(text, lang, res, 'json');
});

router.post('/', (req, res) => {
  res.redirect(`/?lang=${req.body.lang}`);
});

router.get('/upload', function(req, res, next) {
  const lang = req.query.lang || 'en';
  let text = {
    h1: "Upload Document",
    label: "Choose a file or drag it here.",
    submit: "Submit",
  };

  lang === 'en' 
    ? res.render('upload', {text: text})
    : objTranslator(text, lang, res, 'render', 'upload');
  
});

router.get('/doc', function(req, res, next) {

  const str1 = "Lorem ipsum dolor sit amet consectetur adipiscing, elit iaculis quisque ligula dapibus taciti, luctus aliquet maecenas nibh sociis. Iaculis sagittis commodo feugiat porttitor magna praesent eros, ullamcorper ac aenean aptent eget viverra convallis"
  const str2 = "Massa tellus bibendum vulputate eros quam aliquet fermentum dapibus leo auctor"
  const str3 = "Fames etiam primis curabitur tempor convallis habitasse litora enim, lacus tincidunt ante"
  const exampleData = [
    {msgType: 'Good News', msg: str1, color: 'lightgreen'},
    {msgType: 'Bad News', msg: str2, color: 'red'},
    {msgType: 'Next Steps', msg: str3, color: ''}
  ]

  res.render('doc', {data: exampleData});

});

function objTranslator(text, lang, res, resType, view) {
  async.forEachOf(text, (val, key, cb) => {
    try {
      languageTranslator(val, 'en', lang, (translation) => {
        console.log('\nval', val, '\nkey', key, '\ntranslation', translation)
        text[key] = translation;
        cb();
      });
    }
    catch (e) {
      return cb(e);
    }
  }, (err) => {
    if (err) console.log(err);
    if (resType === 'json') res.json({"text": text});
    console.log('translated',text)
    if (resType === 'render') res.render(view, {"text": text});
  })
}

module.exports = router;