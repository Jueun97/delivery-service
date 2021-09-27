const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const mysql = require('mysql');
const conn = mysql.createConnection({
	host     : 'localhost',
	user     : 'u1',
	psasword : '',
	database : 'project'
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/user', function(req, res) {
	conn.query('Select * from 사용자', function(err, rows) {
		if (err) {
			console.log(err);
		} else {
			data = rows;
			res.send(rows);
		}
	});
});

app.get('/admin', function(req, res) {
	conn.query('select * from 관리자', function(err, rows) {
		if (err) {
			console.log(err);
		} else {
			data = rows;
			res.send(rows);
		}
	});
});
app.get('/delivery', function(req, res) {
	conn.query('Select * from 배송정보', function(err, rows) {
		if (err) {
			console.log(err);
		} else {
			data = rows;
			res.send(rows);
		}
	});
});
app.post('/booking__state', function(req, res) {
	let userId = req.body.userId;
	let building = req.body.building;
	let state = req.body.state;
	if (userId == 0) {
		conn.query(
			'UPDATE 사용자 SET 배송현황=? WHERE 건물명=?',
			[
				state,
				building
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
		conn.query(
			'UPDATE 사용자 SET 배송현황=? WHERE 주문자번호=?',
			[
				state,
				parseInt(userId)
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
	let num = 0;
	let state = '배송준비중';
	let building = req.body.building;
	let name = req.body.name;
	let phone = req.body.phone;
	let destination = req.body.destination;
	let document = req.body.document;
	let token = req.body.expoPushToken;
	let paper, totalPaper, totalbooking = 0;
	conn.query(
		'INSERT INTO 사용자 (주문자번호, 이름, 전화번호, 배송지, 서류수량, 건물명, 배송현황,알림코드) VALUES (?,?,?,?,?,?,?,?)',
		[
			num,
			name,
			phone,
			destination,
			document,
			building,
			state,
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

	conn.query('select 서류현황,예약수 from 배송정보 where 건물명=?', building, function(error, rows, fields) {
		if (error) {
			console.log(error);
		} else {
			paper = rows[0].서류현황;
			totalbooking = rows[0].예약수;
			totalbooking++;
			totalPaper = parseInt(paper) + parseInt(document);
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
app.post('/booking__update', function(req, res) {
	let userId = req.body.userId;
	let name = req.body.name;
	let phone = req.body.phone;
	let destination = req.body.destination;
	let document = req.body.document;
	let building = req.body.building;
	let paper = 0;
	conn.query(
		'UPDATE 사용자 SET 이름=?, 전화번호=?, 배송지=?, 서류수량=? WHERE 주문자번호=?',
		[
			name,
			phone,
			destination,
			document,
			parseInt(userId)
		],
		function(error, rows, fields) {
			//db.query('INSERT INTO 배송 set (주문자번호, 이름, 전화번호, 배송지, 서류수량, 건물명, 배송현황) VALUES (?,?,?,?,?,?) ', req.body, function(error, rows, fields){
			if (error) {
				console.log(error);
			} 
		}
	);
	conn.query('SELECT 서류현황 FROM 배송정보 WHERE 건물명=?', building, function(error, rows, fields) {
		if (error) {
			console.log('error', error);
		} else {
			console.log(rows);
			paper = rows[0].서류현황;
			totalDocument = parseInt(paper) + parseInt(document);

			conn.query(
				'UPDATE 배송정보 SET 서류현황=? WHERE 건물명=?',
				[
					totalDocument,
					building
				],
				function(error, rows, fields) {
					if (error) {
						console.log(error);
					}
				}
			);
		}
	});
});
app.post('/booking__delete', function(req, res) {
	let userId = req.body.userId;
	let document = req.body.document;
	let building = req.body.building;
	let totalBooking,totalPaper,paper = 0
	conn.query('select 서류현황,예약수 from 배송정보 where 건물명=?', building, function(error, rows, fields) {
		if (error) {
			console.log(error);
		} else {
			console.log(rows);
			paper = rows[0].서류현황;
			totalBooking = parseInt(rows[0].예약수) - 1;
			totalPaper = parseInt(paper) - parseInt(document);
			conn.query(
				'UPDATE 배송정보 SET 서류현황=?,예약수=? WHERE 건물명=?',
				[
					totalPaper,
					totalBooking,
					building
				],
				function(error, rows, fields) {
					if (error) {
						console.log('eroor3', error);
					}
				}
			);
		}
	});
	conn.query(
		'DELETE FROM 사용자 WHERE 주문자번호=?',
		[
			parseInt(userId)
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
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

