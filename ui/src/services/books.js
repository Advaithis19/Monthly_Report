export function getFilteredBooks(axiosInstance, start_date, end_date) {
  return axiosInstance.get(
    "books/filter/date/" + start_date + "/" + end_date + "/"
  );
}

export function getBooks(axiosInstance) {
  return axiosInstance.get("books/");
}

export function getBookInstance(axiosInstance, id) {
  return axiosInstance.get("books/" + id);
}
