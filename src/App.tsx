import React from "react";
import logo from "./logo.svg";
import "./App.css";
import EmployeeForm from "./components/EmpForm";
import EmployeeList from "./components/EmpList";

function App() {
  return (
    <div className="App">
      <div className="container mx-auto p-4">
        <EmployeeForm />
        <EmployeeList />
      </div>
    </div>
  );
}

export default App;
