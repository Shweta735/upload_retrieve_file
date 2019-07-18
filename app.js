var express = require('express');
var app = express();
var multer  =   require('multer');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp')

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now()+'.'+file.mimetype.split('/')[1]);
  }
});

var upload = multer({ storage : storage}).single('photo');

app.set('view engine','ejs');

mkdirp('./uploads', function (err) {
    if (err) console.error(err)
    else console.log('Created File Upload directory')
});

app.get('/',(req,res)=>{
	res.render('index')
})

app.post('/photo/upload',function(req,res){
	upload(req,res,(err)=>{
		if(err) {
            res.render('error',{message : 'Error in uploading file'});
        }
    else res.render('success');
	})
})
app.get('/photo/get',function(req,res){
  fs.readdir(path.join(__dirname,'uploads'),function(err,fileNames){
    if(err){
      res.render('error', {message : 'Error in getting the files'});
    }
    res.render('data',{files:fileNames})
})
})

app.listen(process.env.PORT || 4000)

