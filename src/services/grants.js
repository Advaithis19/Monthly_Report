export function getFilteredGrants(axiosInstance, start_date, end_date) {
  return axiosInstance.get(
    "grants/filter/date/" + start_date + "/" + end_date + "/"
  );
}

export function getGrants(axiosInstance) {
  return axiosInstance.get("grants/");
}
