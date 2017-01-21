var employeesDirectoryApp = angular.module('employeesDirectoryApp', []);
employeesDirectoryApp.controller('employeesDirectoryController', ['$scope', '$http', function($scope, $http) {  

	$scope.error = {
		"message" : "",
		"isError" : false
	}

	$scope.isInEditMode = false;  

	function refreshView(){
		$scope.isInEditMode = false;
		$scope.error.isError = false;
		$scope.employee = {};
		$http.get('/employees').success(function(response) {
			$scope.employees = response;
		});
	}

	function checkForRequiredFields(){
		var data = $scope.employee;
		if(angular.isDefined(data) && angular.isDefined(data.name) && angular.isDefined(data.email) 
			&& angular.isDefined(data.date_of_birth) && angular.isDefined(data.department)
			&& angular.isDefined(data.gender)){
			return true;
		}else{
			return false;
		}
	}

	function handleError(data){
		$scope.error.isError = true;
		if(data.code === 11000){
			$scope.error.message = "This email already exists!";
		}else{
			$scope.error.message = data.errmsg;
		}
	}

	$scope.addEmployee = function(){
		var flag = checkForRequiredFields();
		if(flag){
			$http.post('/employee', $scope.employee).success(function(response) {
				if(response.errmsg){
					handleError(response);
				}else{				
					refreshView();
				}
				
			})
			.error(function(err){
				console.log(err);
			});
		}else{
			$scope.error = {
				"message" : "Please fill out the complete form",
				"isError" : true
			}
		}
		
	}

	$scope.deleteEmployee = function(id){
		$http.delete('/employee/'+id).success(function(response){
			console.log(response);
			refreshView();
		})
		.error(function(err){
			console.log(err);
		})
	}

	$scope.updateEmployee = function(){
		$http.put('/employee/'+$scope.employee._id, $scope.employee).success(function(response){
			if(response.errmsg){
				handleError(response);
			}else{
				refreshView();
			}
		})
		.error(function(err){
			console.log(err);
		})
	}

	$scope.editEmployee = function(id){
		$scope.error.isError = false;
		$scope.isInEditMode = true;
		$http.get('/employee/'+id).success(function(response){
			$scope.employee = response;
			$scope.employee.date_of_birth = new Date(response.date_of_birth);
		})
		.error(function(err){
			console.log(err);
		})		
	}

	$scope.cancelUpdate = function(){
		$scope.error.isError = false;
		$scope.isInEditMode = false;
		$scope.employee = {};
	}    

	$scope.genderList = ["Female","Male","Other"];

	refreshView();
}]);




