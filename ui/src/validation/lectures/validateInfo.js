export default function validateInfo(values) {
  let errors = {};

  if (!values.topic.trim()) {
    errors.topic = "Topic field is required";
  }

  if (!values.res_person.trim()) {
    errors.res_person = "Resource Person field is required";
  }

  if (!values.organisation.trim()) {
    errors.organisation = "Organisation field is required";
  }

  if (!values.f_id) {
    errors.f_id = "Faculty field is required";
  }

  return errors;
}
