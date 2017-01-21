var mongoose = require('mongoose');
var chalk = require('chalk');
var express = require('express');

//var uri = 'mongodb://localhost/employeesDB';
var uri = 'mongodb://arunaramesh:password123@ds111559.mlab.com:11559/employees_db';
mongoose.connect(uri);


mongoose.connection.on("connected",function(){
	console.log(chalk.yellow("connected to DB"));
});
mongoose.connection.on("error",function(){
	console.log(chalk.red("error in connection to DB"));
});
mongoose.connection.on("disconnected",function(){
	console.log(chalk.red("disconnected from DB"));
});