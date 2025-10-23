import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import "./HRDashboard.css";

export default function HRDashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "jobApplications"),
      orderBy("submittedAt", "desc") // ✅ Match the field used in PersonApp
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEmployees(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="hr-container">
      <h2>HR Dashboard</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>
                  {emp.personal?.firstName} {emp.personal?.lastName}
                </td>
                <td>{emp.personal?.email}</td>
                <td>{emp.personal?.gender}</td>
                <td>{emp.personal?.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No employee data yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
