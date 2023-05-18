const Valid = require("validator");
const isEmp = require("is-empty");

function validateLoginInput(data) {
  const errors: any = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmp(data.email) ? data.email : "";
  data.password = !isEmp(data.password) ? data.password : "";
  // Email checks
  if (Valid.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  // Password checks
  if (Valid.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  return {
    errors,
    isValid: isEmp(errors)
  };
};

export default validateLoginInput;
