const fs = require('fs');

var correctAnswer = 1;


const S3FS = require('s3fs');
const crypto = require("crypto");// Use crypto for generating pID or uID
const s3fsImpl = new S3FS('ACPimages',{
    accessKeyId:'AKIAJHQYUJWVBZ5MUPRA',
    secretAccessKey:'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'
});
s3fsImpl.create();

const session = require('express-session');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite');
db.serialize();

function hisTreeFunc(req,res,next){
    var pid = req.params.pID;
  console.log(pid);
  var note = {
    error: true,
    message: null,
    root: null,
    nodes: null
  }
	if(pid!=null) {
		db.all("SELECT pID, root, parent, imageURL FROM Product WHERE pID=?", [pid], function (err, rows) {
			if(err){
        console.log(err);
				note.message = "Unexpected";
				res.send(note);
			}
			else if(rows.length < 1){
				console.log("Such project does not exist");
        note.message = "Such project does not exist";
				res.send(note);
			}else{
        var x = rows[0].root;
        db.all("SELECT pID, parent, imageURL FROM Product WHERE root=? OR pID=?", [x, x], function (err, rows) {
          if(err){
            console.log(err);
    				note.massage = "Unexpected";
    				res.send(note);
    			}else{
            for(var i = 0; i< rows.length; i++){
              if(rows[i].parent==rows[i].pID){
                note.root = rows[i];
                continue;
              }
            }
            note.nodes=rows;
            note.error = false;
            console.log(note)
            res.send(note);
          }
        });
      }
    });

  }else{
    note.message = "pid is null";
    res.send(note);
  }
}


module.exports = {
	hisTreeFunc: hisTreeFunc
};
