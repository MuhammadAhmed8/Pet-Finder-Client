import {
  getRequest,
  postRequest,
  putRequest,
  patchRequest,
  deleteRequest,
} from "./verb.services";
import { setDogData, setDogCount } from "../actions/dog.actions";
import { notification } from "antd";

export const setUserToLocalStorage = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const addDog = (data, resolve, reject) => {
  return (dispatch) => {
    return postRequest("v1/pets", null, true, data)
      .then(({ data, status }) => {
        if (status === 201) {
          notification.success({
            message: "Success",
            description: "The dog is successfully added for adoption.",
          });
          return resolve();
        } else {
          // Notify Error
          notification.error({
            message: "Error",
            description: "Something went wrong.",
          });
          return reject();
        }
      })
      .catch((error) => {
        const err =
          error && error.response && error.response.data
            ? error.response.data.message
            : "Something went wrong";
        // Notify Error
        notification.error({
          message: "Error",
          description: err,
        });
        return reject(error);
      });
  };
};

export const getDog = (page = 1, breedname = null, resolve, reject) => {
  let params = { page };
  if (breedname !== null) params.breed = breedname;

  return (dispatch) => {
    return getRequest("v1/pets", params, false)
      .then(({ data, status }) => {
        let dogData = data.pets;
        let dogCount = data.petCounts;
        if (status === 200) {
          dispatch(setDogData([...dogData]));
          dispatch(setDogCount(dogCount));

          return resolve(dogData);
        } else {
          // Notify Error
          notification.error({
            message: "Error",
            description: "Something went wrong.",
          });
          return reject();
        }
      })
      .catch((error) => {
        const err =
          error && error.response && error.response.data
            ? error.response.data.message
            : "Something went wrong";
        // Notify Error
        notification.error({
          message: "Error",
          description: err,
        });
        return reject(error);
      });
  };
};

export const UpdateDog = (id, data, resolve, reject) => {
  return patchRequest(`/v1/pets/${id}`, true, true, data)
    .then(({ data, status }) => {
      if (status === 200) {
        notification.success({
          message: "Success",
          description: "Request Successfull",
        });
        return resolve();
      } else {
        // Notify Error
        notification.error({
          message: "Error",
          description: "Something went wrong.",
        });
        return reject();
      }
    })
    .catch((error) => {
      const err =
        error && error.response && error.response.data
          ? error.response.data.message
          : "Something went wrong";
      // Notify Error
      notification.error({
        message: "Error",
        description: err,
      });
      return reject();
    });
};

export const deleteDog = (id, resolve, reject) => {
  return deleteRequest(`v1/pets/${id}`, null, true)
    .then(({ data, status }) => {
      if (status === 204) {
        notification.success({
          message: "Success",
          description: "The dog is deleted successfully.",
        });
        return resolve();
      } else {
        // Notify Error
        notification.error({
          message: "Error",
          description: "Something went wrong.",
        });
        return reject();
      }
    })
    .catch((error) => {
      const err =
        error && error.response && error.response.data
          ? error.response.data.message
          : "Something went wrong";
      // Notify Error
      notification.error({
        message: "Error",
        description: err,
      });
      return reject(error);
    });
};
