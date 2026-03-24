import axiosInstance from "../api/axiosInstance";
import { BOOKING_ENDPOINTS } from "../constants/constants";

const createBooking = async (values) => {
  const response = await axiosInstance.post(
    BOOKING_ENDPOINTS.createBooking,
    values,
  );
  return response.data;
};

export { createBooking };
