import axiosInstance from "../api/axiosInstance";
import { PAYMENT_ENDPOINTS } from "../constants/constants";

const createPayment = async (values) => {
  const response = await axiosInstance.post(
    PAYMENT_ENDPOINTS.createPayment,
    values,
  );
  return response.data;
};

const paymentStatus = async (id) => {
  const response = await axiosInstance.get(
    `${PAYMENT_ENDPOINTS.paymentStatus}/${id}`,
  );
  return response.data;
};

export { createPayment, paymentStatus };
