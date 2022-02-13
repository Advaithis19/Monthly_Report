export function getFilteredMemberships(axiosInstance, start_date, end_date) {
  return axiosInstance.get(
    "memberships/filter/date/" + start_date + "/" + end_date + "/"
  );
}

export function getMemberships(axiosInstance) {
  return axiosInstance.get("memberships/");
}

export function getMembershipInstance(axiosInstance, id) {
  return axiosInstance.get("memberships/" + id);
}
