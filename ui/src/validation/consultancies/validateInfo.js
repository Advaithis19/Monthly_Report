export default function validateInfo(values) {
  let errors = {};

  if (!values.title.trim()) {
    errors.title = "Title field is required";
  }

  if (!values.fund_agency.trim()) {
    errors.fund_agency = "Agency field is required";
  }

  if (!values.rec_amt) {
    errors.rec_amt = "Amount field is required";
  }

  if (!values.f_id) {
    errors.f_id = "Faculty field is required";
  }

  return errors;
}
