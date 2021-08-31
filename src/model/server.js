const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port1 = 3000;
var data;
const mysql = require('mysql');
const conn = mysql.createConnection({
	host     : 'localhost',
	user     : 'u1',
	psasword : '',
	database : 'project'
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/User', function(req, res) {
	conn.query('Select * from 사용자', function(err, rows) {
		if (err) {
			console.log(err);
		} else {
			data = rows;
			res.send(rows);
		}
	});
});

app.get('/Admin', function(req, res) {
	conn.query('select * from 관리자', function(err, rows) {
		if (err) {
			console.log(err);
		} else {
			data = rows;
			res.send(rows);
		}
	});
});
app.get('/Delivery', function(req, res) {
	conn.query('Select * from 배송정보', function(err, rows) {
		if (err) {
			console.log(err);
		} else {
			data = rows;
			res.send(rows);
		}
	});
});
app.post('/User', function(req, res) {
	var UserID = req.body.UserID;
	var Building = req.body.Building;
	var Cond = req.body.Condition;
	if (UserID == 0) {
		var sql = 'UPDATE 사용자 SET 배송현황=? WHERE 건물명=?';
		console.log(Cond, Building);
		conn.query(
			sql,
			[
				Cond,
				Building
			],
			function(err, rows) {
				if (err) {
					console.log(err);
				} else {
					res.send(JSON.stringify(rows));
				}
			}
		);
	} else {
		var sql = 'UPDATE 사용자 SET 배송현황=? WHERE 주문자번호=?';
		conn.query(
			sql,
			[
				Cond,
				parseInt(UserID)
			],
			function(err, rows) {
				if (err) {
					console.log(err);
				} else {
					res.send(JSON.stringify(rows));
				}
			}
		);
	}
});
app.post('/booking', function(req, res) {
	var num = 0;
	var cond = '배송준비중';
	var building = req.body.building;
	var Name = req.body.Name;
	var Phone = req.body.Phone;
	var desti_1 = req.body.desti_1;
	var doc = req.body.doc;
	var token = req.body.expoPushToken;
	console.log('예약쭝');
	console.log(building, Name, Phone);
	conn.query(
		'INSERT INTO 사용자 (주문자번호, 이름, 전화번호, 배송지, 서류수량, 건물명, 배송현황,알림코드) VALUES (?,?,?,?,?,?,?,?)',
		[
			num,
			Name,
			Phone,
			desti_1,
			doc,
			building,
			cond,
			token
		],
		function(error, rows, fields) {
			//db.query('INSERT INTO 배송 set (주문자번호, 이름, 전화번호, 배송지, 서류수량, 건물명, 배송현황) VALUES (?,?,?,?,?,?) ', req.body, function(error, rows, fields){
			if (error) {
				console.log(error);
			} else {
				res.send(JSON.stringify(rows));
			}
		}
	);
	var paper, totalPaper;
	conn.query('select 서류현황,예약수 from 배송정보 where 건물명=?', building, function(error, rows, fields) {
		if (error) {
			console.log(error);
		} else {
			paper = rows[0].서류현황;
			totalbooking = rows[0].예약수;
			totalbooking++;
			totalPaper = parseInt(paper) + parseInt(doc);
			conn.query(
				'UPDATE 배송정보 SET 서류현황=?,예약수=? WHERE 건물명=?',
				[
					totalPaper,
					totalbooking,
					building
				],
				function(error, rows, fields) {
					if (error) {
						console.log(error);
					} else {
					}
				}
			);
		}
	});
});
app.post('/update', function(req, res) {
	var UserID = req.body.UserID;
	var Name = req.body.Name;
	var Phone = req.body.Phone;
	var desti_1 = req.body.desti_1;
	var doc = req.body.doc;
	var finalDoc = req.body.finalDoc;
	var building = req.body.building;
	console.log('>>>>>>>', building);
	console.log('업데이트쯍');
	var sql = 'UPDATE 사용자 SET 이름=?, 전화번호=?, 배송지=?, 서류수량=? WHERE 주문자번호=?';
	conn.query(
		sql,
		[
			Name,
			Phone,
			desti_1,
			doc,
			parseInt(UserID)
		],
		function(error, rows, fields) {
			//db.query('INSERT INTO 배송 set (주문자번호, 이름, 전화번호, 배송지, 서류수량, 건물명, 배송현황) VALUES (?,?,?,?,?,?) ', req.body, function(error, rows, fields){
			if (error) {
				console.log(error);
			} else {
			}
		}
	);
	var paper, totalPaper;
	conn.query('select 서류현황 from 배송정보 where 건물명=?', building, function(error, rows, fields) {
		if (error) {
			console.log('error2', error);
		} else {
			console.log(rows);
			paper = rows[0].서류현황;
			totalbooking = parseInt(paper) + parseInt(finalDoc);
			console.log('total : ', finalDoc, totalbooking);

			conn.query(
				'UPDATE 배송정보 SET 서류현황=? WHERE 건물명=?',
				[
					finalDoc,
					building
				],
				function(error, rows, fields) {
					if (error) {
						console.log(error);
					} else {
						console.log('hhihi');
					}
				}
			);
		}
	});
});
app.post('/delete', function(req, res) {
	var UserID = req.body.UserID;
	var doc = req.body.doc;
	var building = req.body.building;
	console.log('삭제쯍');
	var sql = 'DELETE FROM 사용자 WHERE 주문자번호=?';
	conn.query('select 서류현황,예약수 from 배송정보 where 건물명=?', building, function(error, rows, fields) {
		if (error) {
			console.log(error);
		} else {
			console.log(rows);
			paper = rows[0].서류현황;
			totalbooking = parseInt(rows[0].예약수) - 1;
			totalPaper = parseInt(paper) - parseInt(doc);
			console.log('total : ', totalPaper);
			conn.query(
				'UPDATE 배송정보 SET 서류현황=?,예약수=? WHERE 건물명=?',
				[
					totalPaper,
					totalbooking,
					building
				],
				function(error, rows, fields) {
					if (error) {
						console.log('eroor3', error);
					} else {
						console.log('hhihi');
					}
				}
			);
		}
	});
	conn.query(
		sql,
		[
			parseInt(UserID)
		],
		function(error, rows, fields) {
			//db.query('INSERT INTO 배송 set (주문자번호, 이름, 전화번호, 배송지, 서류수량, 건물명, 배송현황) VALUES (?,?,?,?,?,?) ', req.body, function(error, rows, fields){
			if (error) {
				console.log(error);
			} else {
				res.send(JSON.stringify(rows));
			}
		}
	);
});
app.listen(port1, () => console.log(`Example app listening at http://localhost:${port1}`));

