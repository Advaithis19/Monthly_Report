export function getFilteredProposals(axiosInstance, start_date, end_date) {
  return axiosInstance.get(
    "proposals/filter/date/" + start_date + "/" + end_date + "/"
  );
}

export function getProposals(axiosInstance) {
  return axiosInstance.get("proposals/");
}

export function getProposalInstance(axiosInstance, id) {
  return axiosInstance.get("proposals/" + id);
}
