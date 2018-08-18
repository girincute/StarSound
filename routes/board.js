var express = require('express');
const mysql = require('mysql');
const dbconfig = require('../config/database');
const conn = mysql.createConnection(dbconfig);
var router = express.Router();

// 글 전체
router.get('/', function (req, res, next) {
    let sql = `SELECT * FROM board`
    conn.query(sql, (err, rows, fields) => {
        if (err) throw err;
        res.json(rows);
    });
});

// 글 좋아요
router.get('/:id/like', function (req, res, next) {
    let board_id = req.params.id;
    let sql = `UPDATE board SET board_hit = board_hit + 1 WHERE board_idx = ? `;
    let params = [board_id];
    conn.query(sql, params ,(err, rows, fields) => {
        if (err) throw err;
        res.json(`${board_id} 번 게시물 좋아요 응답 성공!`);
    });
});

// 특정 글 조회
router.get('/:id', function (req, res, next) {
    let sql = `SELECT * FROM board WHERE board_idx = ?`
    let params = [req.params.id];
    conn.query(sql, params, (err, rows, fields) => {
        if (err) throw err;
        res.json(rows);
    });
});

// 글 추가
router.post('/', function (req, res, next) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1
    let day = date.getDate();
    if(month < 10){
        month = "0"+month;
    }
    if(day < 10){
        day = "0"+day;
    }

    let today = year+"-"+month+"-"+day;

    let title = req.body.title;
    let description = req.body.description;

    let sql = `INSERT INTO board (board_title,board_des,board_date) VALUES (?,?,?) `;
    let params = [title, description, today];

    conn.query(sql, params, (err, rows, fields) => {
        if (err) throw err;
        res.status(400).send("성공!");
    });
});



// 특정 글 삭제
router.delete('/:id', function (req, res, next) {
    let board_id = req.params.id;
    let sql = `DELETE FROM board WHERE board_idx = ?`
    let params = [board_id];

    conn.query(sql, params, (err, rows, fields) => {
        if (err) throw err;
        res.status(400).send("성공!");
    });
});

module.exports = router;
