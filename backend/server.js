const express = require("express");
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(bodyParser.json());

// 테이블 생성하기 
/*db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT, 
    PRIMARY KEY (id)
)`, (err, results, fileds) => {
    console.log('results', results)
})*/


//DB lists 테이블에 있는 모든 데이터를 프론트 서베에 보내주기 
app.get('/api/values',function (req, res) {
    db.pool.query('SELECT * FROM lists;',
        (err, results, fileds) => {
            if (err)
                return res.status(500).send(err)
            else
                return res.json(results)
        })
})

// 클라이언트에서 입력한 값을 데이터베이스 lists 테이블에 넣어주기
app.post('/api/value', function (req, res, next) {
    //데이터베이스에 값 넣어주기
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
        (err, results, fileds) => {
            if (err)
                return res.status(500).send(err)
            else
                return res.json({ success: true, value: req.body.value })
        })
})


app.listen(5000, () => {
    console.log('애플리케이션이 5000번 포트에서 시작되었습니다.')
})