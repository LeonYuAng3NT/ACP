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

function getProductFunc(req,res,next){
	var id = req.query.pID;
	var name = req.params.name;
	console.log(id);
	console.log(name);
	if(id!=null) {

		db.all("SELECT pID, name, root, parent, dateIssued, imageURL,admin,artist,description FROM Product WHERE pID=?", [id], function (err, rows) {
			if(err){
				console.log(err);
				res.send(err);
			}
			if(rows.length < 1){
				console.log("Such product does not exist");
				res.send([]);
				return;
			}
			res.json(rows[0]);
		});
	}else if (name!=null) {

		db.all("SELECT pID, name, root, parent, dateIssued, imageURL,admin,artist,description FROM Product WHERE name=?", [name], function (err, rows) {
			var result = [];
			if (err) {
				console.log(err);
				res.send(err);
			}
			if (rows.length < 1) {
				console.log("Such product does not exist");
				res.send(result);
				return;
			}
			rows.map(function (row) {

				let product = {
					pID: row.pID,
					name: row.name,
					root: row.root,
					parent: row.parent,
					dateIssued: row.dateIssued,
					imageURL: row.imageURL,
					admin: row.admin,
					artist: row.artist,
					description: row.description

				};
				result.push(product);
			});
			console.log(result);
			res.send(result);


		});

	}

	/*

	 */
}
module.exports = {
	getProductFunc: getProductFunc
};
