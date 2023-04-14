//
const mysql = require('mysql');
const conn = {  
    host: 'localhost',
    port: '3306',
    user:'test',
    password: 'test',
    database: 'sanneomeo'
};
const connection = mysql.createConnection(conn); 
connection.connect(); 
//

const express = require('express')
const app = express()

app.get('', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/trail/:code', (req, res) => {
    console.log(req.params);
    connection.query(`select tbl_trail_path.latitude, tbl_trail_path.longitude, tbl_trail.trail_seq 
    from tbl_trail
    join tbl_trail_path
    on tbl_trail.trail_seq=tbl_trail_path.trail_seq
    where tbl_trail.mountain_seq= ?;`,[req.params.code], function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
    });
})

app.listen(3000, () => {
    console.log('I love you 3000')
})