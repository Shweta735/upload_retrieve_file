var express = require('express');
var app = express();
var multer  =   require('multer');
var fs = require('fs');
var path = require('path');

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

app.get('/',(req,res)=>{
	res.render('index')
})

app.post('/photo/upload',function(req,res){
	upload(req,res,(err)=>{
		if(err) {
            res.end("Error uploading file.");
        }
        res.render('success');
	})
})
app.get('/photo/get',function(req,res){
  fs.readdir(path.join(__dirname,'uploads'),function(err,fileNames){
    if(err){
      res.end('error');
    }
    res.render('data',{files:fileNames})
})
})

app.listen(process.env.PORT || 4000)

