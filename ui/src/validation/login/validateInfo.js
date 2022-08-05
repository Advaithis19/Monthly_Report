export default function validateInfo(values) {
  let errors = {};

  const emailRegex = new RegExp(/[a-zA-Z]+[0-9]*[a-zA-Z]*@rvce.edu.in/i);

  if (!values.email) {
    errors.email = "Email field is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Please enter an RVCE email address";
  }

  if (!values.password) {
    errors.password = "Password field is required";
  }

  return errors;
}
