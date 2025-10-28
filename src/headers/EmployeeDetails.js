import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import SideBar from "./SideBar";
import { db } from "../firebase";
import "./EmployeeDetails.css";

export default function EmployeeDetails() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");
  const [editMode, setEditMode] = useState({ personal: false, professional: false });
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const docRef = doc(db, "jobApplications", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEmp({ id: docSnap.id, ...docSnap.data() });
          setUpdatedData(docSnap.data());
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

  const handleEditToggle = (section) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleInputChange = (section, field, value) => {
    setUpdatedData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = async (section) => {
    try {
      const docRef = doc(db, "jobApplications", id);
      await updateDoc(docRef, { [section]: updatedData[section] });
      setEmp(updatedData);
      setEditMode((prev) => ({ ...prev, [section]: false }));
      alert("✅ Details updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
      alert("❌ Error updating details!");
    }
  };

  const personal = updatedData.personal || {};
  const education = updatedData.education || {};
  const professional = updatedData.professional || {};

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <SideBar />
      </div>

      <div className="employee-details-container">
        {/* ===== HEADER ===== */}
        <div className="employee-header">
          <img
            src={personal.photo || "https://i.ibb.co/5Y8N8tL/avatar.png"}
            alt={personal.firstName}
            className="emp-photo"
          />
          <div className="emp-info">
            <p><strong>Name:</strong> {personal.firstName} {personal.lastName}</p>
            <p><strong>Employee ID:</strong> {emp.id}</p>
            <p><strong>Phone:</strong> {personal.phone}</p>
            <p><strong>Email:</strong> {personal.email}</p>
          </div>
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
            <div className="info-header">
              <h3>Personal Information</h3>
              <span
                className="edit-icon"
                onClick={() => handleEditToggle("personal")}
              >
                ✎
              </span>
            </div>

            {Object.entries(personal).map(([key, value]) => (
              <p key={key}>
                <b>{key.replace(/([A-Z])/g, " $1")}:</b>{" "}
                {editMode.personal ? (
                  <input
                    type="text"
                    value={value || ""}
                    onChange={(e) =>
                      handleInputChange("personal", key, e.target.value)
                    }
                  />
                ) : (
                  value || "N/A"
                )}
              </p>
            ))}

            {editMode.personal && (
              <button
                className="save-btn"
                onClick={() => handleSave("personal")}
              >
                 Save
              </button>
            )}
          </div>
        )}

        {/* ===== PROFESSIONAL TAB ===== */}
        {activeTab === "professional" && (
          <div className="education-info">
            <div className="info-header">
              <h3>Professional Details</h3>
              <span
                className="edit-icon"
                onClick={() => handleEditToggle("professional")}
              >
                ✎
              </span>
            </div>

            {/* Existing fields */}
            {Object.entries(professional).map(([key, value]) => (
              <p key={key}>
                <b>{key.replace(/([A-Z])/g, " $1")}:</b>{" "}
                {editMode.professional ? (
                  <input
                    type="text"
                    value={value || ""}
                    onChange={(e) =>
                      handleInputChange("professional", key, e.target.value)
                    }
                  />
                ) : (
                  value || "N/A"
                )}
              </p>
            ))}

            {/* New fields */}
            {["managerName", "projectAssigned", "assignedDate"].map((field) => (
              <p key={field}>
                <b>{field.replace(/([A-Z])/g, " $1")}:</b>{" "}
                {editMode.professional ? (
                  <input
                    type={field === "assignedDate" ? "date" : "text"}
                    value={professional[field] || ""}
                    onChange={(e) =>
                      handleInputChange("professional", field, e.target.value)
                    }
                  />
                ) : (
                  professional[field] || "N/A"
                )}
              </p>
            ))}

            {editMode.professional && (
              <button
                className="save-btn"
                onClick={() => handleSave("professional")}
              >
                Save
              </button>
            )}
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
