export default function validateInfo(values) {
  let errors = {};

  if (!values.title.trim()) {
    errors.title = "Title field is required";
  }

  if (!values.conference.trim()) {
    errors.conference = "Conference field is required";
  }

  if (!values.volume) {
    errors.volume = "Volume # field is required";
  }

  if (!values.issue) {
    errors.issue = "Issue # field is required";
  }

  if (!values.n_page) {
    errors.n_page = "Page # field is required";
  }

  if (!values.f_id) {
    errors.f_id = "Faculty field is required";
  }

  return errors;
}
