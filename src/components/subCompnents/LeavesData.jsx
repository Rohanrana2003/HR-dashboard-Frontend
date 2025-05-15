import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";

const LeavesData = ({ fetchLeavesData, setShowForm }) => {
  const leavesData = useSelector((state) => state.leaves);

  const handleStatusChange = async (status, id) => {
    try {
      await axios.patch(
        BASE_URL + "/leaves/" + status + "/" + id,
        {},
        { withCredentials: true }
      );

      //Fteching updated leaves data
      fetchLeavesData();
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    return `${dd}-${mm}-${yy}`;
  };

  return (
    <div className="candidates-container">
      {/* Header section */}
      <section className="header">
        <div className="header-filters">
          <select id="status" className="">
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Scheduled</option>
          </select>
        </div>

        <div className="header-actions">
          <button className="btn" onClick={() => setShowForm(true)}>
            Add Leave
          </button>
        </div>
      </section>

      {/* Main container */}
      <div className="candidates-list">
        <ul className="headings-container">
          <li>Sr no.</li>
          <li>Employee Name</li>
          <li>Date</li>
          <li>Reason</li>
          <li>Status</li>
          <li>Docs</li>
        </ul>
        {leavesData &&
          leavesData.map((leave, index) => {
            return (
              <ul className="candidate-data-container" key={leave._id}>
                <li>{index + 1}</li>
                <li className="leave-name">
                  <h3>{leave.name}</h3>
                  <p>{leave.department}</p>
                </li>
                <li>{formatDate(leave.date)}</li>
                <li>{leave.reason}</li>
                <li>
                  <select
                    id="position"
                    value={leave.status}
                    onChange={(e) =>
                      handleStatusChange(e.target.value, leave._id)
                    }
                    className={
                      leave.status === "approved" ? "candidate-selected" : ""
                    }
                  >
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </li>
                <li>
                  <a
                    href={leave.document}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/document-icon.png" alt="document" />
                  </a>
                </li>
              </ul>
            );
          })}
      </div>
    </div>
  );
};

export default LeavesData;
