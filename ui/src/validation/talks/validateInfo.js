export default function validateInfo(values) {
  let errors = {};

  if (!values.topic.trim()) {
    errors.topic = "Topic field is required";
  }

  if (!values.venue.trim()) {
    errors.venue = "Venue field is required";
  }

  if (!values.f_id) {
    errors.f_id = "Faculty field is required";
  }

  return errors;
}
