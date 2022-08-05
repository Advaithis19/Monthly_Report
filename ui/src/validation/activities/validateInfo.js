export default function validateInfo(values) {
  let errors = {};

  if (!values.activity.trim()) {
    errors.activity = "Activity field is required";
  }

  if (!values.f_id) {
    errors.f_id = "Faculty field is required";
  }

  return errors;
}
