export default function validateInfo(values) {
  let errors = {};

  if (!values.name.trim()) {
    errors.name = "Name field is required";
  }

  if (!values.publisher.trim()) {
    errors.publisher = "Publisher field is required";
  }

  if (!values.n_isbn) {
    errors.n_isbn = "ISBN # field is required";
  }

  if (values.f_id.length == 0) {
    errors.f_id = "Faculty field is required";
  }

  return errors;
}
