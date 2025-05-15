/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Navbar from "./subCompnents/Navbar";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setLeaves } from "../utils/redux/leaveSlice";
import LeavesData from "./subCompnents/LeavesData";

const Leaves = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [document, setDocument] = useState(null); // State to store the selected file
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const formReset = () => {
    setName("");
    setDepartment("");
    setDate("");
    setDocument(null);
    setReason("");
  };
  // Fetching leaves data and updating in redux store

  // Adding LEAVE IN THE DATABASE
  const addLeave = async () => {
    setError("");
    if (!name || !department || !date || !reason || !document) {
      setError("Please fill all the fields");
      return;
    }
    // Prepare FormData
    const data = new FormData();
    data.append("name", name);
    data.append("department", department);
    data.append("date", date);
    data.append("document", document); // Appending the file
    data.append("reason", reason);

    try {
      await axios.post(BASE_URL + "/leave/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      formReset();
      setShowForm(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const fetchLeavesData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/leaves", {
        withCredentials: true,
      });
      dispatch(setLeaves(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  fetchLeavesData();

  useEffect(() => {
    fetchLeavesData();
  }, []);
  return (
    <div className="right-panel">
      <Navbar heading={"Leaves"} />
      <LeavesData fetchLeavesData={fetchLeavesData} setShowForm={setShowForm} />
      {/* Adding Candidates form */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>Add New Leave</h2>
              <button className="close-btn" onClick={() => setShowForm(false)}>
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
                type="text"
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="department*"
                required
              />
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Date*"
                required
              />

              <input
                type="file"
                id="document"
                onChange={(e) => setDocument(e.target.files[0])} // Store selected file
                name="document"
                accept=".pdf,.doc,.docx"
                required
              />
              <input
                type="text"
                name="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason*"
                required
              />
              {error && <p className="candidate-error">{error}</p>}
              <button type="submit" onClick={addLeave} className="submit-btn">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaves;
