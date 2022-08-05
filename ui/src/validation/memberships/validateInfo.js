export default function validateInfo(values) {
  let errors = {};

  if (!values.membership.trim()) {
    errors.membership = "Membership field is required";
  }

  if (!values.association.trim()) {
    errors.association = "Association field is required";
  }

  if (!values.term) {
    errors.term = "Term field is required";
  }

  if (values.f_id.length == 0) {
    errors.f_id = "Faculty field is required";
  }

  return errors;
}
