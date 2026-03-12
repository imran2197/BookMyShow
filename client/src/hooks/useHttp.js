import { useReducer } from "react";

const httpReducer = (state, action) => {
  switch (action.type) {
    case "PENDING":
      return {
        data: null,
        isLoading: true,
        error: false,
      };
    case "SUCCESS":
      return {
        data: action.payload,
        isLoading: false,
        error: null,
      };
    case "ERROR":
      return {
        data: null,
        isLoading: false,
        error: action.error,
      };
  }
  throw new Error("Invalid Event");
};

const useHttp = (requestFunction, startsWithPending = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    data: null,
    isLoading: startsWithPending,
    error: null,
  });

  const sendRequest = async (...requestData) => {
    try {
      dispatch({ type: "PENDING" });
      const data = await requestFunction(...requestData);
      dispatch({ type: "SUCCESS", payload: data.data });
    } catch (err) {
      dispatch({
        type: "ERROR",
        error: err.message || "Something went wrong!",
      });
    }
  };
  return {
    ...httpState,
    sendRequest,
  };
};

export default useHttp;
