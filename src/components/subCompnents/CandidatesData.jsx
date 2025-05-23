import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useState } from "react";
import { useSelector } from "react-redux";

const CandidatesData = ({ fetchCandidatesData, setShowForm }) => {
  const [activeActionId, setActiveActionId] = useState(null);
  const candidates = useSelector((state) => state.candidates);

  // Updating the candidate status to rejected or selected
  const handleStatusChange = async (status, id) => {
    try {
      await axios.patch(
        BASE_URL + "/candidates/" + status + "/" + id,
        {},
        { withCredentials: true }
      );

      //Fteching candidates data
      fetchCandidatesData();
    } catch (err) {
      console.log(err);
    }
  };

  // deleting the candidate
  const deleteCandidate = async (id) => {
    try {
      await axios.delete(BASE_URL + "/employees/delete/" + id, {
        withCredentials: true,
      });

      // Fetching updated employees data after deletion
      fetchCandidatesData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="candidates-container">
      {/* Header section */}
      <section className="header">
        <div className="header-filters">
          <select id="status" className="">
            <option value="">Status</option>
            <option value="new">New</option>
            <option value="scheduled">Scheduled</option>
            <option value="ongoing">Ongoing</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
          </select>

          <select id="position" className="">
            <option value="">Position</option>
            <option value="designer">Designer</option>
            <option value="human resource">Human Resource</option>
            <option value="developer">Developer</option>
          </select>
        </div>

        <div className="header-actions">
          <button className="btn" onClick={() => setShowForm(true)}>
            Add Candidate
          </button>
        </div>
      </section>

      {/* Main container */}
      <div className="candidates-list">
        <ul className="headings-container">
          <li>Sr no.</li>
          <li>Candidate Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Position</li>
          <li>Status</li>
          <li>Experience</li>
          <li>Action</li>
        </ul>

        {candidates &&
          candidates.map((candidate, index) => {
            return (
              <ul className="candidate-data-container" key={candidate._id}>
                <li>{index + 1}</li>
                <li>{candidate.name}</li>
                <li>{candidate.email}</li>
                <li>{candidate.phone}</li>
                <li>{candidate.position}</li>
                <li>
                  <select
                    id="position"
                    value={candidate.status}
                    onChange={(e) =>
                      handleStatusChange(e.target.value, candidate._id)
                    }
                  >
                    <option value="new">New</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="selected">Selected</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </li>
                <li>{candidate.experience} years</li>
                <li
                  onMouseEnter={() =>
                    setActiveActionId((prev) =>
                      prev === candidate._id ? null : candidate._id
                    )
                  }
                  onMouseLeave={() => setActiveActionId(null)}
                  className="action-container"
                >
                  <img className="action-icon" src="images/action-icon.png" />
                  {activeActionId == candidate._id && (
                    <ul className="action-buttons-candidates">
                      <li>
                        <a
                          href={candidate.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download Resume
                        </a>
                      </li>
                      <li onClick={() => deleteCandidate(candidate._id)}>
                        Delete Candidate
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

export default CandidatesData;
