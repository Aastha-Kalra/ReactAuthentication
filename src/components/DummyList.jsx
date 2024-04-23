import React, { useState, useEffect } from "react";
import axios from "axios";

const DummyListPage = () => {
  const [formData, setFormData] = useState({ name: "", salary: "", age: "" });
  const [dummyData, setDummyData] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.salary || !formData.age) {
      alert("Please enter name, salary, and age");
      return;
    }

    try {
      const response = await axios.post(
        "https://dummy.restapiexample.com/api/v1/create",
        formData
      );
      console.log("Data posted:", response.data);
      if (response.data.status === "success") {
        const newEmployee = response.data.data;
        setDummyData([...dummyData, newEmployee]);
        alert("Employee added successfully!");
      } else {
        alert("Error adding employee. Please try again later.");
      }
    } catch (error) {
      console.error("Error posting data:", error);
      alert("Error posting data. Please try again later.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://dummy.restapiexample.com/api/v1/employees"
      );
      console.log("Fetched data:", response.data);
      setDummyData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 style={{ margin: "10px" }}>Add Employee</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter name"
        />
        <input
          className="input"
          type="text"
          name="salary"
          value={formData.salary}
          onChange={handleInputChange}
          placeholder="Enter salary"
        />
        <input
          className="input"
          type="text"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          placeholder="Enter age"
        />
        <button className="button" type="submit">
          Add
        </button>
      </form>
      <div className="table-container">
        <h2 style={{ margin: "10px" }}>All Employees</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {dummyData ? (
              dummyData.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.employee_name}</td>
                  <td>{employee.employee_salary}</td>
                  <td>{employee.employee_age}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DummyListPage;
