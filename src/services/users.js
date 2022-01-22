export function getUsers(axiosInstance) {
  return axiosInstance.get("users/");
}
