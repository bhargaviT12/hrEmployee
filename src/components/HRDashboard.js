import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../headers/SideBar";
import "./HRDashboard.css";

export default function HRDashboard() {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(db, "jobApplications"),
      orderBy("submittedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc, index) => ({
        id: doc.id,
        empId: `E${(index + 1).toString().padStart(3, "0")}`, // stable display ID
        ...doc.data(),
      }));
      setEmployees(data);
    });

    return () => unsubscribe();
  }, []);

  // Safe filter to prevent undefined errors
  const filteredEmployees = employees.filter((emp) =>
    (emp.empId || "").toLowerCase().includes(searchId.toLowerCase())
  );

  const HandleSubmit = () => {
    navigate("/employee");
  };

  return (
    <div className="dashboard-layout">
      <div className="sidebar"><SideBar /></div>
      <div className="hr-container">
        <h2 className="title">Employee Management</h2>

        <div className="top-bar">
          <input
            type="text"
            className="search-box"
            placeholder="🔍 Search by ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button className="add-btn" onClick={HandleSubmit}>
            + Add Employee
          </button>
        </div>

        <table className="employee-table">
          <thead>
            <tr>
              <th>EMP-ID</th>
              <th>EMP-Name</th>
              <th>Designation</th>
              <th>Project</th>
              <th>Manager</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <Link className="emp-link" to={`/hr/employee/${emp.id}`}>
                      {emp.empId}
                    </Link>
                  </td>
                  <td>
                    {emp.personal?.firstName} {emp.personal?.lastName}
                  </td>
                  <td>{emp.designation || "Software Developer"}</td>
                  <td>{emp.project || "Not Assigned"}</td>
                  <td>{emp.manager || "Not Assigned"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No employee data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
