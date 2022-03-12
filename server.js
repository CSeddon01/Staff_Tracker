const express = require('express');
const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: "Ez2guess",
    database: 'employees'
  });

  // connection.connect(function (err) {
  //   if (err) throw err;
  // });
  


// module.exports = connection;

console.log(process.env.SQL_PASSWORD);