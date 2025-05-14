/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Navbar from "./subCompnents/Navbar";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addEmployees } from "../utils/redux/employeesSlice";

const Attendance = () => {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  // Updating the status of the employee to absent or present
  const handleStatusChange = async (status, id) => {
    try {
      await axios.patch(
        BASE_URL + "/employees/attendance/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      fetchAttendanceData();
      //Fteching candidates data
    } catch (err) {
      console.log(err);
    }
  };

  // fetching employees data and updating in redux store
  const fetchAttendanceData = async () => {
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

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  return (
    <div className="right-panel">
      <Navbar heading={"Attendance"} />

      <div className="candidates-container">
        {/* Header section */}
        <section className="header">
          <div className="header-filters">
            <select id="position" className="">
              <option value="">Status</option>
              <option value="new">Present</option>
              <option value="scheduled">Absent</option>
            </select>
          </div>
        </section>
        {/* Main container */}
        <div className="candidates-list">
          <ul className="headings-container">
            <li>Sr no.</li>
            <li>Candidate Name</li>
            <li>Email Address</li>
            <li>Position</li>
            <li>Department</li>

            <li>Attendance Status</li>
          </ul>

          {employees &&
            employees.map((employee, index) => {
              return (
                <ul className="candidate-data-container" key={employee._id}>
                  <li>{index + 1}</li>
                  <li>{employee.name}</li>
                  <li>{employee.email}</li>
                  <li>{employee.position}</li>
                  <li>{employee.department}</li>
                  <li>
                    <select
                      id="position"
                      value={employee.attendanceStatus}
                      onChange={(e) =>
                        handleStatusChange(e.target.value, employee._id)
                      }
                      className={
                        employee.attendanceStatus === "present"
                          ? "candidate-selected"
                          : employee.status === "absent"
                          ? "candidate-rejected"
                          : ""
                      }
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                  </li>
                </ul>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
