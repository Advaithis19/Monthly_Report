export default function validateInfo(values) {
  let errors = {};

  if (!values.title.trim()) {
    errors.title = "Title field is required";
  }

  if (!values.agency.trim()) {
    errors.agency = "Agency field is required";
  }

  if (!values.sanc_amt) {
    errors.sanc_amt = "Amount field is required";
  }

  if (!values.PI) {
    errors.PI = "Principle Investigator field is required";
  }

  if (!values.CO_PI) {
    errors.CO_PI = "Co-Principle Investigator field is required";
  }

  return errors;
}
