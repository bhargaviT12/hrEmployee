import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import SideBar from "./SideBar"
import { db } from "../firebase";

import "./EmployeeDetails.css";

export default function EmployeeDetails() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const docRef = doc(db, "jobApplications", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEmp({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) return <p>Loading employee data...</p>;
  if (!emp) return <p>Employee not found</p>;

  const personal = emp.personal || {};
  const education = emp.education || {};
  const professional = emp.professional || {};

  return (
    <div className="dashboard-layout">
          <div className="sidebar"><SideBar /></div>
    <div className="employee-details-container">
      {/* ===== HEADER ===== */}
      <div className="employee-header">
        <img
          src={
            personal.photo ||
            "https://i.ibb.co/5Y8N8tL/avatar.png"
          }
          alt={personal.firstName}
          className="emp-photo"
        />
        <div class="personal-details">
  <p><strong>Name:</strong> {personal.firstName} {personal.lastName}</p>
  <p><strong>Employee ID:</strong> {emp.id}</p>
  <p><strong>Phone:</strong> {personal.phone}</p>
  <p><strong>Email:</strong> {personal.email}</p>
</div>

        {/* <div className="emp-info">
          <p><strong>Name:</strong> {personal.firstName} {personal.lastName}</p>
          <p><strong>Employee ID:</strong> {emp.id}</p>
          <p><strong>Phone:</strong> {personal.phone}</p>
          <p><strong>Email:</strong> {personal.email}</p>
        </div> */}
      </div>

      {/* ===== TABS ===== */}
      <div className="tabs">
        <span
          className={`tab ${activeTab === "personal" ? "active" : ""}`}
          onClick={() => setActiveTab("personal")}
        >
          Personal
        </span>
        
        <span
          className={`tab ${activeTab === "professional" ? "active" : ""}`}
          onClick={() => setActiveTab("professional")}
        >
          Professional
        </span>
      </div>

      {/* ===== PERSONAL TAB ===== */}
      {activeTab === "personal" && (
        <div className="education-info">
          <h3>Personal Information</h3>
          <p><b>Full Name:</b> {personal.firstName} {personal.middleName} {personal.lastName}</p>
          <p><b>Gender:</b> {personal.gender}</p>
          <p><b>Blood Group:</b> {personal.bloodGroup}</p>
          <p><b>Phone:</b> {personal.phone}</p>
          <p><b>Email:</b> {personal.email}</p>
          <p><b>Current Address:</b> {personal.currentAddress}</p>
          <p><b>Permanent Address:</b> {personal.permanentAddress}</p>
          <p><b>Village:</b> {personal.village}</p>
          <p><b>State:</b> {personal.state}</p>
          <p><b>Pincode:</b> {personal.pincode}</p>
          <p><b>Landmark:</b> {personal.landmark}</p>
          
        </div>
      )}

      

      {/* ===== PROFESSIONAL TAB ===== */}
      {activeTab === "professional" && (
        <div className="education-info">
          <h2>Professional Details</h2>
          <p><b>Skills:</b> {professional.skills}</p>
          <p><b>Projects:</b> {professional.projects}</p>
          <p><b>Certifications:</b> {professional.certificate}</p>
          <p><b>Achievements:</b> {professional.achievements}</p>
          <p><b>Job Type:</b> {emp.jobType}</p>
          <p><b>LinkedIn:</b> {professional.linkedin}</p>
        </div>
      )}

      {/* ===== BUTTONS ===== */}
      <div className="button-row">
        <button className="payroll-btn">💰 Payroll</button>
        <button className="leaves-btn">🗓 Leaves</button>
      </div>
    </div>
  </div>
  );
}
