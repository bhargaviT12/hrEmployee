// src/PersonApp.js
import React, { useState } from "react";
import Sidebar from "./employee/Sidebar";
import PersonalDetails from "./employee/PersonalDetails";
import EducationDetails from "./employee/EducationDetails";
import ProfessionalDetails from "./employee/ProfessionalDetails";
import ReviewSubmit from "./employee/ReviewSubmit";
import "./indexApp.css";
import "./PersonApp.css";

import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // ✅ Import Firestore connection

function PersonApp() {
  const [active, setActive] = useState("personal");
  const [errors, setErrors] = useState({});

  const [personal, setPersonal] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    alternativePhone: "",
    currentAddress: "",
    permanentAddress: "",
    sameAddress: false,
    photo: null,
    bloodGroup: "",
    gender: "",
    landmark: "",
    pincode: "",
    village: "",
    state: "",
  });

  const [education, setEducation] = useState({
    schoolName10: "",
    year10: "",
    cgpa10: "",
    interOrDiploma: "",
    collegeName12: "",
    year12: "",
    cgpa12: "",
    collegeNameUG: "",
    yearUG: "",
    cgpaUG: "",
    gapReason12: "",
    gapReasonUG: "",
  });

  const [professional, setProfessional] = useState({
    jobType: "",
    resume: null,
    skills: "",
    projects: "",
    linkedin: "",
    certificate: "",
    achievements: "",
    experiences: [],
  });

  const goTo = (step) => setActive(step);

  const handleSubmitToFirebase = async () => {
    try {
      const applicationData = {
        personal,
        education,
        professional,
        submittedAt: new Date(),
      };

      // ✅ Add data to Firestore
      await addDoc(collection(db, "jobApplications"), applicationData);

      alert("✅ Application submitted successfully!");

      // Reset all forms
      setPersonal({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phone: "",
        alternativePhone: "",
        currentAddress: "",
        permanentAddress: "",
        sameAddress: false,
        photo: null,
        bloodGroup: "",
        gender: "",
        landmark: "",
        pincode: "",
        village: "",
        state: "",
      });

      setEducation({
        schoolName10: "",
        year10: "",
        cgpa10: "",
        interOrDiploma: "",
        collegeName12: "",
        year12: "",
        cgpa12: "",
        collegeNameUG: "",
        yearUG: "",
        cgpaUG: "",
        gapReason12: "",
        gapReasonUG: "",
      });

      setProfessional({
        jobType: "",
        resume: null,
        skills: "",
        projects: "",
        linkedin: "",
        certificate: "",
        achievements: "",
        experiences: [],
      });

      setErrors({});
      setActive("personal");
    } catch (error) {
      alert("❌ Error submitting application: " + error.message);
      console.error("Firebase Error:", error);
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar-wrap">
        <div className="brand">
          <div>
            <img className="brand-circle" src="logo.jpg" alt="Company Logo" />
          </div>
          <div>
            <div className="brand-title">DhatVi Business</div>
            <div className="brand-sub">Driving Technology</div>
          </div>
        </div>

        <Sidebar active={active} onNavigate={goTo} />
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h2>Job Application Form</h2>
        </header>

        <section className="content-card">
          {active === "personal" && (
            <PersonalDetails
              data={personal}
              setData={setPersonal}
              setActive={setActive}
              errors={errors}
              setErrors={setErrors}
            />
          )}

          {active === "education" && (
            <EducationDetails
              data={education}
              setData={setEducation}
              setActive={setActive}
              errors={errors}
              setErrors={setErrors}
            />
          )}

          {active === "professional" && (
            <ProfessionalDetails
              data={professional}
              setData={setProfessional}
              setActive={setActive}
              errors={errors}
              setErrors={setErrors}
            />
          )}

          {active === "review" && (
            <ReviewSubmit
              personal={personal}
              education={education}
              professional={professional}
              setErrors={setErrors}
              onBack={() => setActive("personal")}
              onSuccess={handleSubmitToFirebase} // ✅ Uploads to Firestore
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default PersonApp;
