const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config()
const { ORIGINS, DB_HOST, DB_NAME, DB_USER, DB_PASS, API_PORT, PWD_SECRET } = process.env;
const TokenManager = require('./tokenManager')
const TimeLog = require('./timeLog')
const sha256 = require('sha256');




const corsOptions = {
  origin: ORIGINS.split(','),
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors());
app.use(express.json());
const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  // timezone: 'Asia/Bangkok'
  dateStrings: true,
  timezone: '+07:00'
});

app.get('/getprojects', cors(corsOptions), (req, res) => {
  console.log(TimeLog()+'/getprojects');
  connection.query(
    `SELECT * FROM portfolios`,
    function(err, results, fields) {
      if(err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.send(results);
      }
    }
  );
});
app.post('/addproject', cors(corsOptions), (req, res) => {
  console.log(TimeLog()+'/addproject');
  let jwtStatus = TokenManager.authAccess(req);
  if(jwtStatus == 'demo') {
    res.json({msg:'user demo isn\'t permission'})
  } else if(jwtStatus!=false){
    const { title, description, tag, stacks, typeContent, liveSite, repo, ThumbnailUrl, thumbnailDes, contents, onShow, showHome } = req.body
    connection.query(
      `INSERT INTO portfolios(title, description, tag, stacks, typeContent, liveSite, repo, thumbnailUrl, thumbnailDes, contents, onShow, showHome) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
      [title, description, tag, stacks, typeContent, liveSite, repo, ThumbnailUrl, thumbnailDes, contents, onShow, showHome],
      (err, results, fields)=>{
        if(err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send(results);
        }
      }
    )
  }else{
    res.status(401)
    res.json({msg:'Token invalid'})
  }
})
app.put('/editproject', cors(corsOptions), (req, res) => {
  console.log(TimeLog()+'/editproject');
  let jwtStatus = TokenManager.authAccess(req);
  if(jwtStatus == 'demo') {
    res.json({msg:'user demo isn\'t permission'})
  } else if(jwtStatus!=false){
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
          res.status(500).send("Internal Server Error");
        } else {
          res.send(results);
        }
      }
    )
  }else{
    res.status(401)
    res.json({msg:'Token invalid'})
  }
})
app.delete('/deleteproject', cors(corsOptions), (req, res) => {
  console.log(TimeLog()+'/deleteproject');
  let jwtStatus = TokenManager.authAccess(req);
  if(jwtStatus == 'demo') {
    res.json({msg:'user demo isn\'t permission'})
  } else if(jwtStatus!=false){
    connection.query(
      `DELETE FROM portfolios WHERE id = ?`,
      [req.body.id],
      (err, results, fields)=>{
        if(err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send(results);
        }
      }
    )  
  }else{
    res.status(401)
    res.json({msg:'Token invalid'})
  }
})

app.get('/getskills', cors(corsOptions), (req, res) => {
  console.log(TimeLog()+'/getskills');
  connection.query(
    `SELECT * FROM skills`,
    function(err, results, fields) {
      if(err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.send(results);
      }
    }
  );
});
app.post('/addskill', cors(corsOptions), (req, res) => {
  console.log(TimeLog()+'/addskill');
  let jwtStatus = TokenManager.authAccess(req);
  if(jwtStatus == 'demo') {
    res.json({msg:'user demo isn\'t permission'})
  } else if(jwtStatus!=false){
    const { skill, level, iconUrl, iconName, description, onShow } = req.body
    connection.query(
      `INSERT INTO skills(skill, level, iconUrl, iconName, description, onShow) VALUES(?,?,?,?,?,?)`,
      [skill, level, iconUrl, iconName, description, onShow],
      function(err, results, fields) {
        if(err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send(results);
        }
      }
    );  
  }else{
    res.status(401)
    res.json({msg:'Token invalid'})
  }
});
app.put('/editskill', cors(corsOptions), (req, res) => {
  console.log(TimeLog()+'/editskill');
  let jwtStatus = TokenManager.authAccess(req);
  if(jwtStatus == 'demo') {
    res.json({msg:'user demo isn\'t permission'})
  } else if(jwtStatus!=false){
    const { id, skill, level, iconUrl, iconName, description, onShow } = req.body
    connection.query(
      `UPDATE skills SET skill = ?, level = ?, iconUrl = ?, iconName = ?, description = ?, onShow = ? WHERE id = ?`,
      [skill, level, iconUrl, iconName, description, onShow, id],
      function(err, results, fields) {
        if(err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send(results);
        }
      }
    );  
  }else{
    res.status(401)
    res.json({msg:'Token invalid'})
  }
});
app.delete('/deleteskill', cors(corsOptions), (req, res) => {
  console.log(TimeLog()+'/deleteskill');
  let jwtStatus = TokenManager.authAccess(req);
  if(jwtStatus == 'demo') {
    res.json({msg:'user demo isn\'t permission'})
  } else if(jwtStatus!=false){
    connection.query(
      `DELETE FROM skills WHERE id = ?`,
      [req.body.id],
      function(err, results, fields) {
        if(err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send(results);
        }
      }
    );  
  }else{
    res.status(401)
    res.json({msg:'Token invalid'})
  }
});

app.get('/getpersonaldata', cors(corsOptions), (req, res) => {
  console.log(TimeLog()+'/getpersonaldata');
  connection.query(
    `SELECT * FROM personal`,
    function(err, results, fields) {
      if(err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.send(results);
      }
    }
  );
});
app.put('/editpersonaldata', cors(corsOptions), (req, res) => {
  console.log(TimeLog()+'/editpersonaldata');
  let jwtStatus = TokenManager.authAccess(req);
  if(jwtStatus == 'demo') {
    res.json({msg:'user demo isn\'t permission'})
  } else if(jwtStatus!=false){
    const { id, name, birthday, age, location, phone, email, motto, personalRecord, personalImage, contactImage } = req.body
    connection.query(
      `UPDATE personal SET name=?, birthday=?, age=?, location=?, phone=?, email=?, motto=?, personalRecord=?, prosonalImage=?, contactImage=? WHERE id=1`,
      [name, birthday, age, location, phone, email, motto, personalRecord, personalImage, contactImage],
      function(err, results, fields) {
        if(err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        } else {
          // res.send(results);
          res.send({msg:'Save Personal Data!'})
        }
      }
    );  
  }else{
    res.status(401)
    res.send({msg:'Token invalid'})
  }
});

app.get('/getlog', cors(corsOptions), (req, res) => {
  console.log(TimeLog()+'/getlog');
  let jwtStatus = TokenManager.authAccess(req);
  if(jwtStatus == 'demo') {
    res.json({msg:'user demo isn\'t permission'})
  } else if(jwtStatus!=false){
    // const { count } = req.body
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
          res.status(500).send("Internal Server Error");
        } else {
          res.send(results);
        }
      }
    );
  // } else if(jwtStatus == 'demo') {
  //   res.json({msg:'user demo isn\'t permission'})
  } else{
    res.status(401)
    res.json({msg:'Token invalid'})
  }
});

app.post('/access', cors(corsOptions), (req, res) => {
  console.log(TimeLog()+'/access');
  const { ip, page } = req.body
  connection.query(
    `INSERT INTO log_access(ip, page) VALUES(?,?)`,
    [ip, page],
    function(err, results, fields) {
      if(err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.json({msg:'Data collection success.'})
      }
    }
  );
});

app.post('/login',(req,res)=>{
  console.log(TimeLog()+'/login');
  const { user, pass } = req.body
  const passHash = sha256(pass+PWD_SECRET)
  connection.query(
    `SELECT * FROM users WHERE user=? and pass=?`,
    [user,passHash],
    (err,result,fields)=> {
      if(err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }else{
        try{
          // res.send(TokenManager.getGenerateAccessToken({'user_id':result[0].user}))
          const accToken = TokenManager.getGenerateAccessToken({'user_id':result[0].user})
          const rfToken = TokenManager.getGenerateRefreshToken({'user_id':result[0].user})
          res.json({
            access_token:accToken,
            // refresh_token:rfToken
          })
        }catch{
          res.status(401)
          res.json({msg:'user or pass invalid'})
        }
      }
    }
  )
})

app.post('/createuser', cors(corsOptions), (req, res) => {
  console.log(TimeLog()+'/createuser');
  res.json({msg:'close function'})
  // const { user, pass } = req.body
  // const passHash = sha256(pass+PWD_SECRET)
  // connection.query(
  //   `INSERT INTO users(user, pass) VALUES(?,?)`,
  //   [user, passHash],
  //   function(err, results, fields) {
  //     if(err) {
  //       console.log(err);
  //       res.status(500).send("Internal Server Error");
  //     } else {
  //       res.json({msg:'create user success.'})
  //     }
  //   }
  // );
});

app.post('/auth',(req,res)=>{
  console.log(TimeLog()+'/auth');
  let jwtStatus = TokenManager.authAccess(req);
  if(jwtStatus!=false){
    res.status(401)
    res.json({status:'ok'})
    // res.send(jwtStatus)
  }else{
    res.status(401)
    res.json({msg:'Token invalid'})
  }
})
app.post('/authrefresh',(req,res)=>{
  console.log(TimeLog()+'/authrefresh');
  let jwtStatus = TokenManager.authRefresh(req);
  if(jwtStatus!=false){
    res.status(401)
    res.json({status:'ok'})
    // res.send(jwtStatus)
  }else{
    res.status(401)
    res.json({msg:'Token invalid'})
  }
})

app.listen(API_PORT, () => {
  console.log(TimeLog()+'CORS enable. Server on port '+API_PORT);
})