import React from "react";

const FormError = ({ error = "" }) => {
  console.log(error)
  if (error !== "") {
    return <span className="form-error is-visible">{error}</span>;
  }
  return null;
};

export default FormError;
