/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from "./subCompnents/Navbar";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addCandidates } from "../utils/redux/candidatesSlice";
import CandidatesData from "./subCompnents/CandidatesData";

const Candidates = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const formReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPosition("");
    setExperience("");
    // setResume("");
  };

  // Adding candidate in the database
  const addCandidate = async () => {
    setError("");
    if (!name || !email || !phone || !position || !experience) {
      setError("Please fill all the fields");
      return;
    }
    // Prepare FormData
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("position", position);
    data.append("experience", experience);
    data.append("resume", resume); // Appending the file

    try {
      await axios.post(BASE_URL + "/candidates/addCandidate", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      formReset();
      fetchCandidatesData();
      setShowForm(false);
      // console.log(res);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  //Ftehching candidates data and updating in redux store
  const fetchCandidatesData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/candidates", {
        withCredentials: true,
      });
      dispatch(addCandidates(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCandidatesData();
  }, []);

  return (
    <div className="right-panel">
      <Navbar heading={"Candidates"} />

      <CandidatesData
        fetchCandidatesData={fetchCandidatesData}
        setShowForm={setShowForm}
      />

      {/* Adding Candidates form */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>Add New Candidate</h2>
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
                type="text"
                name="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Experience in years"
                required
              />

              <input
                type="file"
                id="resume"
                onChange={(e) => setResume(e.target.files[0])} // Store selected file
                name="resume"
                accept=".pdf,.doc,.docx"
                required
              />
              {error && <p className="candidate-error">{error}</p>}
              <button
                type="submit"
                onClick={addCandidate}
                className="submit-btn"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
