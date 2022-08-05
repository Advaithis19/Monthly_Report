export default function validateInfo(values) {
  let errors = {};

  if (!values.title.trim()) {
    errors.title = "Title field is required";
  }

  if (!values.organisation.trim()) {
    errors.organisation = "Organisation field is required";
  }

  if (!values.f_id) {
    errors.f_id = "Faculty field is required";
  }

  return errors;
}
