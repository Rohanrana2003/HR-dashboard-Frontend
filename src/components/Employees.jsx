/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from "./subCompnents/Navbar";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addEmployees } from "../utils/redux/employeesSlice";
import EmployeesData from "./subCompnents/EmployeesData";

const Employees = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const formReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPosition("");
    setDepartment("");
    setDate("");
  };

  // fetching employees data and updating in redux store
  const fetchEmployeesData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/employees", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addEmployees(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  // Updating the employee
  const updateEmployeeData = async () => {
    setError("");
    if (!name || !email || !phone || !department || !position || !date) {
      setError("Please fill all the fields");
      return;
    }
    try {
      await axios.patch(
        BASE_URL + "/employees/update",
        {
          name,
          email,
          phone,
          department,
          position,
          dateOfJoining: date,
        },
        { withCredentials: true }
      );
      setShowForm(false);
      formReset();
      fetchEmployeesData();
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchEmployeesData();
  }, []);
  return (
    <div className="right-panel">
      <Navbar heading={"Employees"} />

      <EmployeesData
        fetchEmployeesData={fetchEmployeesData}
        setShowForm={setShowForm}
      />

      {/* Updating Employees Data Form  */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>Edit Employee Details</h2>
              <button
                className="close-btn"
                onClick={() => {
                  setShowForm(false);
                  formReset();
                }}
              >
                ✖
              </button>
            </div>

            <form
              className="candidate-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name*"
                required
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address*"
                required
              />
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number*"
                required
              />
              <input
                type="text"
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Department*"
                required
              />
              <select
                name="position"
                value={position}
                placeholder="Position*"
                onChange={(e) => setPosition(e.target.value)}
                required
              >
                <option value="">Select Position*</option>
                <option value="Intern">Intern</option>
                <option value="Full Time">Full Time</option>
                <option value="Senior">Senior</option>
                <option value="Junior">Junior</option>
                <option value="Team Lead">Team Lead</option>
              </select>
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Date of Joining*"
                required
              />
              {error && <p className="candidate-error">{error}</p>}
              <button
                type="submit"
                onClick={updateEmployeeData}
                className="submit-btn"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
