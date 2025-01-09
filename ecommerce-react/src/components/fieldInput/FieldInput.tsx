import React from "react";
import PropTypes from "prop-types";
import "./fieldInput.css";

const FieldInput = ({ label, value, onChange, type = "text", placeholder }) => {
  return (
    <div className="field-input">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

FieldInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

export default FieldInput;
