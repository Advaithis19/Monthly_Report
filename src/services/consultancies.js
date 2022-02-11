export function getFilteredConsultancies(axiosInstance, start_date, end_date) {
  return axiosInstance.get(
    "consultancies/filter/date/" + start_date + "/" + end_date + "/"
  );
}

export function getConsultancies(axiosInstance) {
  return axiosInstance.get("consultancies/");
}

export function getConsultancyInstance(axiosInstance, id) {
  return axiosInstance.get("consultancies/" + id);
}
