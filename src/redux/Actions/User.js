import axios from "axios";
import authHeader from "../../authHeader";


const BASE_URL = process.env.REACT_APP_BASE_URL;

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await axios.post(
      `${BASE_URL}/api/v1/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
localStorage.setItem("token", data.token);
    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get(`${BASE_URL}/api/v1/me`,authHeader());

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "postOfFollowingRequest",
    });

    const { data } = await axios.get(`${BASE_URL}/api/v1/posts`,authHeader());
    dispatch({
      type: "postOfFollowingSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "postOfFollowingFailure",
      payload: error.response.data.message,
    });
  }
};


export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "allPostsRequest",
    });
    const { data: allPostsData } = await axios.get(`${BASE_URL}/api/v1/posts/all`,authHeader());
    dispatch({
      type: "allPostsSuccess",
      payload: allPostsData.posts, // Send the combined posts from the backend
    });
  } catch (error) {
    dispatch({
      type: "allPostsFailure",
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};


export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "myPostsRequest",
    });

    const { data } = await axios.get(`${BASE_URL}/api/v1/my/posts`,authHeader());
    dispatch({
      type: "myPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "myPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "allUsersRequest",
      });

      const { data } = await axios.get(`${BASE_URL}/api/v1/users?name=${name}`,authHeader());
      dispatch({
        type: "allUsersSuccess",
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: "allUsersFailure",
        payload: error.response.data.message,
      });
    }
  };

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });

    await axios.get(`${BASE_URL}/api/v1/logout`);

    dispatch({
      type: "LogoutUserSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const registerUser =
  (formData) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });

      const { data } = await axios.post(
       `${BASE_URL}/api/v1/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

localStorage.setItem("token", data.token)

      dispatch({
        type: "RegisterSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };

export const updateProfile = (name, nameId, tag, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });

    const { data } = await axios.put(
      `${BASE_URL}/api/v1/update/profile`,
      { name, nameId, tag, avatar },
      authHeader(),
    );

    dispatch({
      type: "updateProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });

      const { data } = await axios.put(
        `${BASE_URL}/api/v1/update/password`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "updatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const deleteMyProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProfileRequest",
    });

    const { data } = await axios.delete(`${BASE_URL}/api/v1/delete/me`,authHeader());

    dispatch({
      type: "deleteProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgotPasswordRequest",
    });

    const { data } = await axios.post(
      `${BASE_URL}/api/v1/forgot/password`,
      {
        email,
      },
      authHeader(),
    );

    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPasswordRequest",
    });

    const { data } = await axios.put(
      `${BASE_URL}/api/v1/password/reset/${token}`,
      {
        password,
      },
      authHeader(),
    );

    dispatch({
      type: "resetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userPostsRequest",
    });

    const { data } = await axios.get(`${BASE_URL}/api/v1/userposts/${id}`,authHeader());
    dispatch({
      type: "userPostsSuccess",
      payload: data?.posts,
    });
  } catch (error) {
    dispatch({
      type: "userPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userProfileRequest",
    });

    const { data } = await axios.get(`${BASE_URL}/api/v1/user/${id}`,authHeader());
    dispatch({
      type: "userProfileSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "userProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "followUserRequest",
    });

    const { data } = await axios.get(`${BASE_URL}/api/v1/follow/${id}`,authHeader());
    dispatch({
      type: "followUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "followUserFailure",
      payload: error.response.data.message,
    });
  }
};



// In your Redux actions file
export const getPostById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "postRequest",
    });

    const { data } = await axios.get(`${BASE_URL}/api/v1/postDetail/${id}`,authHeader());
    dispatch({
      type: "postSuccess",
      payload: {
        post: data.post,
        user: data.user, // Include user data
      },
    });
  } catch (error) {
    dispatch({
      type: "postFailure",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

