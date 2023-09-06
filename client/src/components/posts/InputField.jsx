import React from "react";

const InputField = ({ label, value, onChange, placeholder, type = "text" }) => {
  return (
    <>
      <label className="label">{label}: </label>
      {type === "text" ? (
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ color: "black" }}
        />
      ) : (
        <textarea
          cols="30"
          value={value}
          onChange={onChange}
          rows="10"
          placeholder={placeholder}
        ></textarea>
      )}
    </>
  );
};

export default InputField;
