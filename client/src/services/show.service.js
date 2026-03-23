import axiosInstance from "../api/axiosInstance";

const addShow = async (payload) => {
  const response = await axiosInstance.post("/add-show", payload);
  return response.data;
};

const updateShow = async (id, payload) => {
  const response = await axiosInstance.put(`/update-show/${id}`, payload);
  return response.data;
};

const deleteShow = async (id) => {
  const response = await axiosInstance.delete(`/delete-show/${id}`);
  return response.data;
};

const getAllShowsByTheatre = async (payload) => {
  const response = await axiosInstance.post(
    "/get-all-shows-by-theatre",
    payload,
  );
  return response.data;
};

const getShowById = async (payload) => {
  const response = await axiosInstance.post("/get-show-by-id", payload);
  return response.data;
};

export { addShow, updateShow, deleteShow, getAllShowsByTheatre, getShowById };
