var express = require('express');
const mysql = require('mysql');
const dbconfig = require('../config/database');
const conn = mysql.createConnection(dbconfig);
var router = express.Router();

// 글 전체
router.get('/', function (req, res, next) {
    console.log('글 전체 목록 보기 접근!')
    let sql = `SELECT * FROM board`
    conn.query(sql, (err, rows, fields) => {
        if (err) throw err;
        res.status(200).json(rows);
    });
});

// 글 좋아요
router.get('/:id/like', function (req, res, next) {
    console.log('글 좋아요 접근!')
    let board_id = req.params.id;
    let sql = `UPDATE board SET board_hit = board_hit + 1 WHERE board_idx = ? `;
    let params = [board_id];
    conn.query(sql, params, (err, rows, fields) => {
        if (err) throw err;
        res.status(200).json(`${board_id} 번 게시물 좋아요 응답 성공!`);
    });
});

// 특정 글 조회
router.get('/:id', function (req, res, next) {
    console.log('특정 글 조회 접근!')
    let sql = `SELECT * FROM board WHERE board_idx = ?`
    let params = [req.params.id];
    conn.query(sql, params, (err, rows, fields) => {
        if (err) throw err;
        res.status(200).json(rows);
    });
});

// 글 추가
router.post('/', function (req, res, next) {
    console.log('글 추가 접근!')

    let title = req.body.title;
    let description = req.body.description;
    let today = getTimeStamp();

    description = description.replace( /시발/gi, '**');
    
    if (description == undefined || description == "" || description == null) {
        return res.status(500).send('description 값 존재 하지 않음');
    }

    console.log(title, description);

    let sql = `INSERT INTO board (board_title,board_des,board_date) VALUES (?,?,?) `;
    let params = [title, description, today];

    conn.query(sql, params, (err, rows, fields) => {
        if (err) throw err;
        res.status(200).send("성공!");
    });
});



// 특정 글 삭제
router.delete('/:id', function (req, res, next) {
    console.log('특정 글 삭제 접근!')
    let board_id = req.params.id;
    let sql = `DELETE FROM board WHERE board_idx = ?`
    let params = [board_id];

    conn.query(sql, params, (err, rows, fields) => {
        if (err) throw err;
        res.status(200).send("성공!");
    });
});

function getTimeStamp() {
    var d = new Date();
    var s = leadingZeros(d.getFullYear(), 4) + '-' + leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2) + ' ' +
        leadingZeros(d.getHours(), 2) + ':' +
        leadingZeros(d.getMinutes(), 2) + ':' +
        leadingZeros(d.getSeconds(), 2);

    return s;
}
function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}




module.exports = router;
