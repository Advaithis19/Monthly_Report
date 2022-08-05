export default function validateInfo(values) {
  let errors = {};

  if (!values.event_name.trim()) {
    errors.event_name = "Event name field is required";
  }

  if (!values.venue.trim()) {
    errors.venue = "Venue field is required";
  }

  if (values.f_id.length == 0) {
    errors.f_id = "Faculty field is required";
  }

  return errors;
}
