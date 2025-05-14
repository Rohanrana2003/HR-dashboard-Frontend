import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

const EmployeesData = ({ fetchEmployeesData, setShowForm }) => {
  const [activeActionId, setActiveActionId] = useState(null);
  const employees = useSelector((state) => state.employees);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    return `${dd}-${mm}-${yy}`;
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(BASE_URL + "/employees/delete/" + id, {
        withCredentials: true,
      });

      // Fetching updated employees data after deletion
      fetchEmployeesData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="candidates-container">
      {/* Header section */}
      <section className="header">
        <div className="header-filters">
          <select id="position" className="">
            <option value="">Position</option>
            <option value="designer">Designer</option>
            <option value="human resource">Human Resource</option>
            <option value="developer">Developer</option>
          </select>
        </div>
      </section>

      {/* Main container */}
      <div className="candidates-list">
        <ul className="headings-container">
          <li>Sr no.</li>
          <li>employee Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Position</li>
          <li>Department</li>
          <li>Date Of Joining</li>
          <li>Action</li>
        </ul>

        {employees &&
          employees.map((employee, index) => {
            return (
              <ul className="candidate-data-container" key={employee._id}>
                <li>{index + 1}</li>
                <li>{employee.name}</li>
                <li>{employee.email}</li>
                <li>{employee.phone}</li>
                <li>{employee.position}</li>
                <li>{employee.department}</li>
                <li>{formatDate(employee.dateOfJoining) || "To be updated"}</li>
                <li
                  onMouseEnter={() =>
                    setActiveActionId((prev) =>
                      prev === employee._id ? null : employee._id
                    )
                  }
                  onMouseLeave={() => setActiveActionId(null)}
                  className="action-container"
                >
                  <img className="action-icon" src="images/action-icon.png" />
                  {activeActionId == employee._id && (
                    <ul className="action-buttons">
                      <li onClick={() => setShowForm(true)}>Edit </li>
                      <li onClick={() => deleteEmployee(employee._id)}>
                        Delete
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            );
          })}
      </div>
    </div>
  );
};

export default EmployeesData;
