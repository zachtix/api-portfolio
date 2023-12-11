CREATE TABLE portfolios(
  id INT(10) NOT NULL Primary KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  tag VARCHAR(20) NOT NULL,
  stacks VARCHAR(100) NOT NULL,
  typeContent VARCHAR(20) NOT NULL,
  liveSite VARCHAR(100),
  repo VARCHAR(100),
  thumbnailUrl VARCHAR(100),
  thumbnailDes VARCHAR(300),
  contents VARCHAR(2000),
  onShow VARCHAR(10) NOT NULL,
  showHome VARCHAR(10) NOT NULL
);

CREATE TABLE skills(
  id INT(10) NOT NULL Primary KEY AUTO_INCREMENT,
  skill VARCHAR(50) NOT NULL,
  level VARCHAR(50) NOT NULL,
  iconUrl VARCHAR(200) NOT NULL,
  iconName VARCHAR(50) NOT NULL,
  description VARCHAR(2000) NOT NULL,
  onShow VARCHAR(10) NOT NULL
);

CREATE TABLE personal(
  id INT(10) NOT NULL Primary KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  birthday VARCHAR(50) NOT NULL,
  age int(10) NOT NULL,
  location VARCHAR(500) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  motto VARCHAR(200) NOT NULL,
  personalRecord VARCHAR(1000) NOT NULL,
  personalImage VARCHAR(100) NOT NULL,
  contactImage VARCHAR(100) NOT NULL
);

CREATE TABLE log_access (
  id INT(10) NOT NULL Primary KEY AUTO_INCREMENT,
  time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ip varchar(50) NOT NULL,
  page varchar(50) NOT NULL
);