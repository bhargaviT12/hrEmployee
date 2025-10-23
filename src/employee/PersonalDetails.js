import React, { useState } from "react";
import { simpleValidatePersonal } from "./validation";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Other",
];

const PersonalDetails = ({ data, setData, setActive, errors, setErrors }) => {
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Handle checkbox logic for address auto-fill
    if (type === "checkbox") {
      if (name === "sameAddress") {
        setData((prev) => ({
          ...prev,
          sameAddress: checked,
          permanentAddress: checked ? prev.currentAddress : "",
        }));
        setErrors((prev) => ({ ...prev, permanentAddress: "" }));
      }
      return;
    }

    // Handle photo upload
    if (type === "file") {
      const file = files[0];
      setData((prev) => ({ ...prev, [name]: file }));
      setPhotoPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, photo: "" }));

      return;
    }

    // Handle regular text/select inputs
    setData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "currentAddress" && prev.sameAddress
        ? { permanentAddress: value }
        : {}),
    }));

    // clear specific field error on change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const next = () => {
    const errs = simpleValidatePersonal(data);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setActive("education");
    }
  };

  return (
    <div className="form-wrap">
      <h3>Personal Details</h3>
      <div className="form-grid">
        {/* ---- Basic Info ---- */}
        <div className="field">
          <label>
            First Name <span className="required-star">*</span>
          </label>
          <input
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <small className="err">{errors.firstName}</small>
          )}
        </div>

        <div className="field">
          <label>Middle Name</label>
          <input
            name="middleName"
            value={data.middleName}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>
            Last Name <span className="required-star">*</span>
          </label>
          <input
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <small className="err">{errors.lastName}</small>}
        </div>

        <div className="field">
          <label>
            Email <span className="required-star">*</span>
          </label>
          <input name="email" value={data.email} onChange={handleChange} />
          {errors.email && <small className="err">{errors.email}</small>}
        </div>

        <div className="field">
          <label>
            Phone <span className="required-star">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only digits and limit to 10
              if (/^\d{0,10}$/.test(value)) {
                setData((prev) => ({ ...prev, phone: value }));
                setErrors((prev) => ({ ...prev, phone: "" }));
              }
            }}
            placeholder="Enter 10-digit number"
          />
          {errors.phone && <small className="err">{errors.phone}</small>}
        </div>

        <div className="field">
          <label>Alternative Phone</label>
          <input
            type="tel"
            name="alternativePhone"
            value={data.alternativePhone}
            onChange={handleChange}
            placeholder="Enter alternate number"
          />
        </div>

        {/* ---- Gender and Blood Group ---- */}
        <div className="field">
          <label>
            Gender <span className="required-star">*</span>
          </label>
          <select
            name="gender"
            value={data.gender || ""}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <small className="err">{errors.gender}</small>}
        </div>

        <div className="field">
          <label>
            Blood Group <span className="required-star">*</span>
          </label>
          <select
            name="bloodGroup"
            value={data.bloodGroup || ""}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          {errors.bloodGroup && (
            <small className="err">{errors.bloodGroup}</small>
          )}
        </div>

        {/* ---- Photo Upload ---- */}
        {/* <div className="field full">
          <label>
            Upload Photo <span className="required-star">*</span>
          </label>
          <input
            type="file"
            name="photo"
            accept="image/jpeg, image/jpg, image/png"
            alt="Image"
            onChange={handleChange}
          />
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Preview"
              style={{
                marginTop: "8px",
                width: "100px",
                height: "100px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          )}
          {errors.photo && <small className="err">{errors.photo}</small>}
        </div> */}

        {/* ---- Address Fields ---- */}
        <div className="field full">
          <label>
            Current Address <span className="required-star">*</span>
          </label>
          <textarea
            name="currentAddress"
            value={data.currentAddress || ""}
            onChange={handleChange}
          />
          {errors.currentAddress && (
            <small className="err">{errors.currentAddress}</small>
          )}
        </div>

        <div className="field full checkbox-field">
          <label>
            <input
              type="checkbox"
              name="sameAddress"
              checked={data.sameAddress || false}
              onChange={handleChange}
            />{" "}
            Same as Current Address
          </label>
        </div>

        <div className="field full">
          <label>
            Permanent Address <span className="required-star">*</span>
          </label>
          <textarea
            name="permanentAddress"
            value={data.permanentAddress || ""}
            onChange={handleChange}
            disabled={data.sameAddress}
          />
          {errors.permanentAddress && (
            <small className="err">{errors.permanentAddress}</small>
          )}
        </div>

        {/* ---- Additional Address Info ---- */}
        <div className="field">
          <label>
            Landmark <span className="required-star">*</span>
          </label>
          <input
            name="landmark"
            value={data.landmark || ""}
            onChange={handleChange}
          />
          <small className="err">{errors.landmark}</small>
        </div>

        <div className="field">
          <label>
            Pincode <span className="required-star">*</span>
          </label>
          <input
            type="text"
            name="pincode"
            value={data.pincode}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only digits and limit to 6
              if (/^\d{0,6}$/.test(value)) {
                setData((prev) => ({ ...prev, pincode: value }));
                setErrors((prev) => ({ ...prev, pincode: "" }));
              }
            }}
            placeholder="Enter 6-digit pincode"
          />

          {errors.pincode && <small className="err">{errors.pincode}</small>}
        </div>

        <div className="field">
          <label>Village</label>
          <input
            name="village"
            value={data.village || ""}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>
            State <span className="required-star">*</span>
          </label>
          <select name="state" value={data.state || ""} onChange={handleChange}>
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && <small className="err">{errors.state}</small>}
        </div>
      </div>

      {/* ---- Buttons ---- */}
      <div className="form-actions">
        <button className="btn primary" onClick={next}>
          Next: Education
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
