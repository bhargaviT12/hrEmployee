// import React, { useState } from "react";
// import "./EmployeeDashboard.css";
// import { db } from "../firebase"; // Import Firestore
// import { collection, addDoc, Timestamp } from "firebase/firestore";

// export default function EmployeeDashboard() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     department: "",
//     salary: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Validation logic
//   const validate = () => {
//     let newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.email) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Invalid email format";
//     if (!formData.department.trim())
//       newErrors.department = "Department is required";
//     if (!formData.salary) newErrors.salary = "Salary is required";
//     else if (isNaN(formData.salary))
//       newErrors.salary = "Salary must be a number";
//     else if (Number(formData.salary) <= 0)
//       newErrors.salary = "Salary must be greater than 0";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccessMessage("");
//     if (validate()) {
//       try {
//         await addDoc(collection(db, "employees"), {
//           ...formData,
//           createdAt: Timestamp.now(),
//         });
//         setSuccessMessage("Employee details submitted successfully!");
//         console.log("Employee data added:", formData);

//         setFormData({ name: "", email: "", department: "", salary: "" });
//       } catch (err) {
//         console.error("Error adding employee:", err);
//         alert("Error submitting data. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Employee Details Form</h2>
//       <form onSubmit={handleSubmit} noValidate>
//         <div className="form-group">
//           <label>Full Name</label>
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter full name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           {errors.name && <small className="error">{errors.name}</small>}
//         </div>

//         <div className="form-group">
//           <label>Email Address</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           {errors.email && <small className="error">{errors.email}</small>}
//         </div>

//         <div className="form-group">
//           <label>Department</label>
//           <input
//             type="text"
//             name="department"
//             placeholder="Enter department"
//             value={formData.department}
//             onChange={handleChange}
//           />
//           {errors.department && (
//             <small className="error">{errors.department}</small>
//           )}
//         </div>

//         <div className="form-group">
//           <label>Salary ($)</label>
//           <input
//             type="text"
//             name="salary"
//             placeholder="Enter salary"
//             value={formData.salary}
//             onChange={handleChange}
//           />
//           {errors.salary && <small className="error">{errors.salary}</small>}
//         </div>

//         <button type="submit" className="submit-btn">
//           Submit
//         </button>
//       </form>

//       {successMessage && <p className="success">{successMessage}</p>}
//     </div>
//   );
// }
