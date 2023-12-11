const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '45.91.133.158',
  user: 'root',
  password: 'zachtix186',
  database: 'portfolio'
});

// Convert Json Data to Mysql
// Portfolios Item
const data = require('./dataPortfolio')
data.forEach(item => {
  const { title, description, tag, typeContent, liveSite, repo, thumbnailUrl, contents } = item;
  let strContent = []
  contents.forEach(content => {
    if(strContent.length != 0) {
      strContent = `${strContent},${content}`
    } else {
      strContent = `${content}`
    }
  });
  connection.query(
    'INSERT INTO `portfolios_test`(title, description, tag, typeContent, liveSite, repo, thumbnailUrl, contents) VALUES(?,?,?,?,?,?,?,?)',
    [title, description, tag, typeContent, liveSite, repo, thumbnailUrl, strContent],
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      // console.log(fields); // fields contains extra meta data about 
      console.log('Error:', err); 
    }
  );
});
// Skills
const data = require('./dataSkills')
data.forEach(item => {
  const { skill, level, iconName, description } = item;
  connection.query(
    'INSERT INTO `skills_test`(skill, level, iconName, description) VALUES(?,?,?,?)',
    [skill, level, iconName, description],
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      // console.log(fields); // fields contains extra meta data about 
      console.log('Error:', err); 
    }
  );
});