export default function validateInfo(values) {
  let errors = {};

  if (!values.purpose.trim()) {
    errors.purpose = "Purpose field is required";
  }

  if (!values.industry.trim()) {
    errors.industry = "Industry field is required";
  }

  if (!values.semester) {
    errors.semester = "Semester field is required";
  }

  if (values.f_id.length == 0) {
    errors.f_id = "Faculty field is required";
  }

  return errors;
}
