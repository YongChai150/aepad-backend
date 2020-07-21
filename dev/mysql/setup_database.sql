
CREATE DATABASE IF NOT EXISTS aeddsdb;

DROP TABLE IF EXISTS report;

CREATE TABLE IF NOT EXISTS report(
    id INT NOT NULL AUTO_INCREMENT,
    patientName VARCHAR(255),
    address VARCHAR(255),
    ic VARCHAR(255),
    age INT,
    dateReported DateTime,

    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255),
    fullname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    handphone1 VARCHAR(255),
    handphone2 VARCHAR(255),

    PRIMARY KEY (id)

);

DROP TABLE IF EXISTS Ovitrap;
CREATE TABLE IF NOT EXISTS Ovitrap(
    ovitrapID INT NOT NULL AUTO_INCREMENT,
    location VARCHAR(255),
    installWeek INT,
    dateInstall DateTime,
    removeWeek INT,
    dateRemove DateTime,

    PRIMARY KEY (ovitrapID)
);

DROP TABLE IF EXISTS Cup;
CREATE TABLE IF NOT EXISTS Cup(
    cupNo INT NOT NULL AUTO_INCREMENT,
    address VARCHAR(255),
    marker INT,
    longitude DECIMAL(19,4),
    latitude DECIMAL(19,4),
    ovitrapID INT NOT NULL,
    result VARCHAR(255),

    PRIMARY KEY (cupNo)
);

INSERT INTO users(username,fullname,email,password,handphone1,handphone2) VALUES
('test1','test1','yongchai97@gmail.com','12345678','0166920346','0166699880');

INSERT INTO report(patientName,address,ic,age,dateReported) VALUES
('Yong Chai 2','pos 1 batu 3','970707015978',15,'2002-07-29');

INSERT INTO ovitrap(location,installWeek,dateInstall,removeWeek,dateRemove) VALUES
('pos 1 batu 2',1,'2020-07-20',5,'2020-08-29');

INSERT INTO cup(address,marker,longitude,latitude,ovitrapID,result) VALUES
('pos 1 batu 2',1,16.999,5.564,3,"0");
