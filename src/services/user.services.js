import {
  getRequest,
  postRequest,
  putRequest,
  patchRequest,
} from "./verb.services";
import {
  setUserData,
  setUserFavourites,
  setUserAdoptions,
} from "../actions/user.actions";
import { message, notification } from "antd";

export const setUserToLocalStorage = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// export const verifyUser = (resolve, reject) => {
//   return (dispatch) => {
//     return getRequest("/user/me", null, true)
//       .then(({ data, status }) => {
//         if (status === 200) {
//           const userData = data.data;
//           dispatch(
//             setUserData({
//               ...userData,
//               selectedTeam:
//                 userData.teams && userData.teams.length > 0
//                   ? userData.teams[0]
//                   : {},
//             })
//           );
//           resolve(userData);
//         } else {
//           notification.error({
//             message: "Error",
//             description: "Something went wrong while verifying user",
//           });
//           reject();
//         }
//       })
//       .catch((err) => {
//         notification.error({
//           message: "Error",
//           description: "Something went wrong while verifying user",
//         });
//         reject(err);
//       });
//   };
// };

/**
 *
 * @param {Object} data Contains username and password
 * @param {Function} resolve
 * @param {Function} reject
 *
 * Authenticates the user and then updates redux with the user.
 */
export const userLogin = (data, resolve, reject) => {
  return (dispatch) => {
    return postRequest("v1/auth/login", null, false, data)
      .then(({ data, status }) => {
        if (status === 200) {
          const userData = data.user;
          const { access } = data.tokens;
          setUserToLocalStorage(userData, access.token);
          dispatch(
            setUserData({
              ...userData,
            })
          );

          return resolve(userData);
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
        return reject;
      });
  };
};

export const userSignup = (data, resolve, reject) => {
  return (dispatch) => {
    return postRequest("v1/auth/register", null, false, data)
      .then(({ data, status }) => {
        if (status === 201) {
          const userData = data.user;
          const { access } = data.tokens;
          setUserToLocalStorage(userData, access.token);
          dispatch(
            setUserData({
              ...userData,
            })
          );
          // Notify Success
          notification.success({
            message: "Success",
            description: "Account has been successfully created.",
          });
          return resolve(userData);
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
        return reject;
      });
  };
};

export const forgotPassword = (email, resolve, reject) => {
  return (dispatch) => {
    return putRequest("user/forgot-password", null, false, { email })
      .then(({ data, status }) => {
        if (status === 200) {
          console.log(data);
          notification.success({
            message: "Success",
            description: "Successfully sent password reset link to your email",
          });
          return resolve();
        } else {
          // Notify Error
          notification.error({
            message: "Error",
            description: "Something went wrong. Internet problem maybe?",
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
};

export const resetPassword = (resetPasswordData, resolve, reject) => {
  return (dispatch) => {
    return putRequest("user/reset-password", null, false, resetPasswordData)
      .then(({ data, status }) => {
        if (status === 200) {
          console.log(data);
          notification.success({
            message: "Success",
            description: "Successfully reset your account password",
          });
          return resolve();
        } else {
          // Notify Error
          notification.error({
            message: "Error",
            description: "Something went wrong. Internet problem maybe?",
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
        return reject;
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(setUserData(null));
    setTimeout(() => {
      window.location = "/";
    }, 500);
  };
};

export const addToFavourites = (data, resolve, reject) => {
  return postRequest("/v1/users/favourites", null, true, data)
    .then(({ data, status }) => {
      if (status === 204) {
        notification.success({
          message: "Success",
          description: "Successfully added in Favourites.",
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

export const getFavourites = (resolve, reject) => {
  return (dispatch) => {
    return getRequest("/v1/users/favourites", false, true)
      .then(({ data, status }) => {
        if (status === 200) {
          let favourites = data.favourites;
          dispatch(setUserFavourites([...favourites]));
          return resolve(favourites);
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
};

export const makeAdoption = (data, resolve, reject) => {
  return postRequest("/v1/adopt/request", null, true, data)
    .then(({ data, status }) => {
      if (status === 201) {
        notification.success({
          message: "Success",
          description: "Successfully sent your adoption request.",
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

export const getAdoptionRequests = (resolve, reject) => {
  return (dispatch) => {
    return getRequest("/v1/adopt/request", false, true)
      .then(({ data, status }) => {
        if (status === 200) {
          dispatch(setUserAdoptions([...data]));
          return resolve(data);
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
};

export const ChangeRequestStatus = (params, data, resolve, reject) => {
  return patchRequest(`/v1/adopt/request/status/${params.id}`, true, true, data)
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

export const CreateConvSendMsg = (data, resolve, reject) => {
  return postRequest("/v1/conversations/message", null, true, data)
    .then(({ data, status }) => {
      if (status === 200) {
        // dispatch(setUserAdoptions([...data]));
        notification.success({
          message: "Success",
          description: "Message sent successfully.",
        });
        return resolve(data);
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

export const getAllConversations = (resolve, reject) => {
  return getRequest("/v1/conversations", false, true)
    .then(({ data, status }) => {
      if (status === 200) {
        let { messages } = data;
        // dispatch(setUserAdoptions([...data]));
        return resolve(messages);
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

export const getAllMessages = (id, resolve, reject) => {
  return getRequest(`/v1/conversations/${id}`, false, true)
    .then(({ data, status }) => {
      if (status === 200) {
        let { messages } = data;
        // dispatch(setUserAdoptions([...data]));
        return resolve(messages);
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

export const sendMessageRequest = (id, data, resolve, reject) => {
  return postRequest(`/v1/conversations/${id}/message`, null, true, data)
    .then(({ data, status }) => {
      if (status === 200) {
        // dispatch(setUserAdoptions([...data]));
        notification.success({
          message: "Success",
          description: "Message sent successfully.",
        });
        return resolve(data);
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
