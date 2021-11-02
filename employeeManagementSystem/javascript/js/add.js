// Employee Class: Represents a Employee
//localStorage.clear();
class Employee {
  constructor(name, age, salary, remarks, email) {
    this.name = name;
    this.age = age;
    this.salary = salary;
    this.remarks = remarks;
    this.email = email;

  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayEmployees() {
    const employees = Store.getEmployees();

    employees.forEach((employee) => UI.addEmployeeToList(employee));
  }

  static addEmployeeToList(employee) {
    const list = document.querySelector('#employee-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.age}</td>
      <td>${employee.salary}</td>
      <td>${employee.remarks}</td>
      <td>${employee.email}</td>

      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>


    `;

    list.appendChild(row);
  }

  static deleteEmployee(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#employee-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#name').value = '';
    document.querySelector('#age').value = '';
    document.querySelector('#salary').value = '';
    document.querySelector('#remarks').value = '';
    document.querySelector('#email').value = '';

  }
}

// Store Class: Handles Storage
class Store {
  static getEmployees() {
    let employees;
    if(localStorage.getItem('employees') === null) {
      employees = [];
    } else {
      employees = JSON.parse(localStorage.getItem('employees'));
    }

    return employees;
  }

  static addEmployee(employee) {
    const employees = Store.getEmployees();
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));
  }

  static removeEmployee(email) {
    const employees = Store.getEmployees();

    employees.forEach((employee, index) => {
      if(employee.email === email) {
        employees.splice(index, 1);
        //localStorage.setItem('employees', JSON.stringify(employees));

      }
    });

    localStorage.setItem('employees', JSON.stringify(employees));
  }

}

// Event: Display Employees
document.addEventListener('DOMContentLoaded', UI.displayEmployees);

// Event: Add a Employee
document.querySelector('#employee-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const name = document.querySelector('#name').value;
  const age = document.querySelector('#age').value;
  const salary = document.querySelector('#salary').value;
  const remarks = document.querySelector('#remarks').value;
  const email = document.querySelector('#email').value;

//variable for email validation
  var atPosition=email.indexOf("@");
  var dotPosition=email.lastIndexOf(".");
  // Validate
  if(name === '' || age === '' || salary === '' || remarks=== '' || email === '')  {
    UI.showAlert('Please fill in all fields', 'danger');
  }
 
  else if(atPosition<1 || dotPosition<atPosition+2 || dotPosition+2>=email.length){
    UI.showAlert('enter a valid email', 'danger');

  }
   else {
    // Instatiate employee
    const employee = new Employee(name, age, salary, remarks, email);

    // Add Employee to UI
    UI.addEmployeeToList(employee);

    // Add employee to store
    Store.addEmployee(employee);

    // Show success message
    UI.showAlert('Employee Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Employee
document.querySelector('#employee-list').addEventListener('click', (e) => {
  // Remove employee from UI
   UI.deleteEmployee(e.target);

  // Remove employee from store
  Store.removeEmployee(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Employee Removed', 'success');
});