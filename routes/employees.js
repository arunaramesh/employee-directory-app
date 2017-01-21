var mongoose = require('mongoose');
var chalk = require('chalk');

var EmployeeSchema = new mongoose.Schema({
    name: { type:String, unique:false},
    email: { type:String, unique:true},
    date_of_birth: { type:Date, unique:false},
    department: { type:String , unique:false},
    gender: { type:String , unique:false},
    age: { type:Number , unique:false}
});

EmployeeSchema.methods.calculateAge = function() {
	var dob = this.date_of_birth;
	var curDate = new Date();
	var age = Math.floor(( curDate - dob ) / (365*24*60*60*1000));
	console.log("inside calculateAge " + age)
	this.age = age;
	return this.age;
};

var employeeModel = mongoose.model('Employee', EmployeeSchema);

exports.getAllEmployees = function(req,res){
	console.log("inside getAllEmployees");
	employeeModel.find({}, function(err,emp){
		console.log("prniting all emp ", emp);
		res.json(emp);
	});
}

exports.addAnEmployee = function(req,res){
	console.log("inside addAnEmployee ");
	var emp = new employeeModel(
		{ 
			name : req.body.name, 
			email : req.body.email, 
			date_of_birth : req.body.date_of_birth, 
			department : req.body.department,
			gender : req.body.gender
		}
	);
	emp.calculateAge();
	emp.save(emp,function(err,emp){
		if(err){
			console.log(chalk.red('error while inserting the employee object ',err));
			res.json(err);
		}else{
			console.log(chalk.green('employee object inserted successfully'));
			res.json(emp);
		}
	});
}

exports.deleteAnEmployee = function(req,res){
	console.log("inside deleteAnEmployee ");
	var id = req.params.employeeID;
	employeeModel.findByIdAndRemove(id,function(err,emp){
		if(err){
			console.log(chalk.red('error while deleting the employee object ',err));
			res.json(err);
		}else{
			console.log(chalk.green('employee object deleted successfully'));
			res.json(emp);
		}
	});
}

exports.updateEmployeeDetails = function(req,res){
	console.log("inside updateEmployeeDetails ");
	var emp = employeeModel(req.body);
	emp.calculateAge();
	var id = req.params.employeeID;
	employeeModel.findByIdAndUpdate(id, emp, function(err,emp){
		if(err){
			console.log(chalk.red('error while updating the employee object ',err));
			res.json(err);
		}else{
			console.log(chalk.green('employee object updated successfully'));
			res.json(emp);
		}
	});
}

exports.getEmployeeDetails = function(req,res){
	console.log("inside getEmployeeDetails ");
	var id = req.params.employeeID;
	employeeModel.findById(id, function(err,emp){
		if(err){
			console.log(chalk.red('error in retrieving employee object ',err));
			res.json(err);
		}else{
			console.log(chalk.green('retrieved employee object successfully'));
			res.json(emp);
		}
	});
}