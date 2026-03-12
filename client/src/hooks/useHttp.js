import { useReducer, useCallback } from "react";

const httpReducer = (state, action) => {
  switch (action.type) {
    case "PENDING":
      return {
        ...state,
        isLoading: true,
      };

    case "SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

const useHttp = (requestFunction, startsWithPending = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    data: null,
    isLoading: startsWithPending,
    error: null,
  });

  const sendRequest = useCallback(
    async (...requestData) => {
      dispatch({ type: "PENDING" });

      try {
        const response = await requestFunction(...requestData);

        dispatch({
          type: "SUCCESS",
          payload: response?.data ?? response,
        });
      } catch (err) {
        dispatch({
          type: "ERROR",
          error:
            err?.response?.data?.message ||
            err?.message ||
            "Something went wrong!",
        });
      }
    },
    [requestFunction],
  );

  return {
    ...httpState,
    sendRequest,
  };
};

export default useHttp;
