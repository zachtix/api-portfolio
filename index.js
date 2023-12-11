const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config()
const { ORIGINS, DB_HOST, DB_NAME, DB_USER, DB_PASS, API_PORT } = process.env;
const TokenManager = require('./tokenManager')

const corsOptions = {
  origin: ORIGINS.split(','),
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors());
app.use(express.json());
const connection = mysql.createConnection({
  host: '45.91.133.158',
  user: 'root',
  password: 'zachtix186',
  database: 'portfolio'
});

app.get('/getprojects', cors(corsOptions), (req, res) => {
  connection.query(
    `SELECT * FROM portfolios`,
    function(err, results, fields) {
      if(err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});
app.post('/addproject', cors(corsOptions), (req, res) => {
  const { title, description, tag, stacks, typeContent, liveSite, repo, ThumbnailUrl, thumbnailDes, contents, onShow, showHome } = req.body
  connection.query(
    `INSERT INTO portfolios(title, description, tag, stacks, typeContent, liveSite, repo, thumbnailUrl, thumbnailDes, contents, onShow, showHome) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
    [title, description, tag, stacks, typeContent, liveSite, repo, ThumbnailUrl, thumbnailDes, contents, onShow, showHome],
    (err, results, fields)=>{
      if(err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  )
})
app.put('/editproject', cors(corsOptions), (req, res) => {
  const { id, title, description, tag, stacks, typeContent, liveSite, repo, thumbnailUrl, thumbnailDes, contents, onShow, showHome } = req.body
  connection.query(
    `UPDATE portfolios SET 
    title = ?,
    description = ?,
    tag = ?,
    stacks = ?,
    typeContent = ?,
    liveSite = ?,
    repo = ?,
    thumbnailUrl = ?,
    thumbnailDes = ?,
    contents = ?,
    onShow = ? ,
    showHome = ? 
    WHERE id = ?`,
    [title, description, tag, stacks, typeContent, liveSite, repo, thumbnailUrl, thumbnailDes, contents, onShow, showHome, id],
    (err, results, fields)=>{
      if(err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  )
})
app.delete('/deleteproject', cors(corsOptions), (req, res) => {
  connection.query(
    `DELETE FROM portfolios WHERE id = ?`,
    [req.body.id],
    (err, results, fields)=>{
      if(err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  )
})

app.get('/getskills', cors(corsOptions), (req, res) => {
  connection.query(
    `SELECT * FROM skills`,
    function(err, results, fields) {
      if(err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});
app.post('/addskill', cors(corsOptions), (req, res) => {
  const { skill, level, iconUrl, iconName, description, onShow } = req.body
  connection.query(
    `INSERT INTO skills(skill, level, iconUrl, iconName, description, onShow) VALUES(?,?,?,?,?,?)`,
    [skill, level, iconUrl, iconName, description, onShow],
    function(err, results, fields) {
      if(err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});
app.put('/editskill', cors(corsOptions), (req, res) => {
  const { id, skill, level, iconUrl, iconName, description, onShow } = req.body
  connection.query(
    `UPDATE skills SET skill = ?, level = ?, iconUrl = ?, iconName = ?, description = ?, onShow = ? WHERE id = ?`,
    [skill, level, iconUrl, iconName, description, onShow, id],
    function(err, results, fields) {
      if(err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});
app.delete('/deleteskill', cors(corsOptions), (req, res) => {
  connection.query(
    `DELETE FROM skills WHERE id = ?`,
    [req.body.id],
    function(err, results, fields) {
      if(err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});

app.get('/getpersonaldata', cors(corsOptions), (req, res) => {
  connection.query(
    `SELECT * FROM personal`,
    function(err, results, fields) {
      if(err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});
app.put('/editpersonaldata', cors(corsOptions), (req, res) => {
  const { id, name, birthday, age, location, phone, email, motto, personalRecord, personalImage, contactImage } = req.body
  connection.query(
    `UPDATE personal SET name=?, birthdat=?, age=?, location=?, phone=?, email=?, motto=?, personalRecord=?, personalImage=?, contactImage=? WHERE id=?`,
    [name, birthday, age, location, phone, email, motto, personalRecord, personalImage, contactImage, id],
    function(err, results, fields) {
      if(err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});

app.get('/getlog', cors(corsOptions), (req, res) => {
  const { count } = req.body
  // res.send(req.body.count)
  connection.query(
    // Count rows
    // 'SELECT COUNT(*) FROM `log_access` WHERE `time` > date_sub(curdate(), interval ? day)',
    // [count],
    // Query lest 7 day
    `SELECT * FROM log_access WHERE time > date_sub(curdate(), interval ? day)`,
    [7],//count = 7
    function(err, results, fields) {
      if(err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});

app.post('/access', cors(corsOptions), (req, res) => {
  const { ip, page } = req.body
  connection.query(
    `INSERT INTO log_access(ip, page) VALUES(?,?)`,
    [ip, page],
    function(err, results, fields) {
      if(err) {
        console.log(err);
      } else {
        res.json({msg:'Data collection success.'})
      }
    }
  );
});

// app.post('/get_token/:user_id', (req, res)=>{
//   res.send(TokenManager.getGenerateAccessToken({'user_id':req.params.user_id}))
// })
app.post('/login',(req,res)=>{
  const {user,pass,expire} = req.body
  connection.query(
    `SELECT * FROM users WHERE user=? and pass=?`,
    [user,pass],
    (err,result,fields)=> {
      if(err) {
        console.log(err);
      }else{
        // console.log(result[0].user);
        // if(result) {
        //   res.send(TokenManager.getGenerateAccessToken({'user_id':result[0].user},expire))
        // }else{
        //   res.send({msg:'Login Failed'})
        // }
        try{
          res.send(TokenManager.getGenerateAccessToken({'user_id':result[0].user},expire))
        }catch{
          res.send('Login Fail')
        }
      }
    }
  )
})
app.post('/auth',(req,res)=>{
  let jwtStatus = TokenManager.authentication(req);
  if(jwtStatus!=false){
    res.send(jwtStatus)
  }else{
    res.send('token err.')
  }
})

app.listen(API_PORT, () => {
  console.log('CORS enable. Server on port '+API_PORT);
})