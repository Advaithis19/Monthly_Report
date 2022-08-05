export default function validateInfo(values) {
  let errors = {};

  if (!values.organisation.trim()) {
    errors.organisation = "Organisation field is required";
  }

  if (!values.mod_col) {
    errors.mod_col = "Mode of Collaboration field is required";
  }

  if (!values.validity) {
    errors.validity = "Validity field is required";
  }

  if (values.f_id.length == 0) {
    errors.f_id = "Faculty field is required";
  }

  return errors;
}
