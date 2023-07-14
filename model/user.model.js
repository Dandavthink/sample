"use strict";
var dbConn = require("../config/db.config");

//Employee object create
var Employee = function (employee) {
  this.id = employee.id;
  this.name = employee.name;
};
Employee.create = function (newEmp, result) {
  dbConn.query("INSERT INTO employess set ?", newEmp, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Employee.findById = function (id, result) {
  dbConn.query(
    "Select * from employess where id = ? ",
    id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};
Employee.findAll = function (result) {
  dbConn.query("Select * from employess", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("employees : ", res);
      result(null, res);
    }
  });
};
Employee.update = function (id, employee, result) {
  dbConn.query(
    "UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?",
    [
      employee.first_name,
      employee.last_name,
      employee.email,
      employee.phone,
      employee.organization,
      employee.designation,
      employee.salary,
      id,
    ],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
Employee.delete = function (id, result) {
  dbConn.query("DELETE FROM employees WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = Employee;
