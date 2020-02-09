import React, { useReducer } from "react";
import axios from "axios";
import { GithubContext } from "./githubContext";
import { githubReducer } from "./githubReducer";

import {
  SEARCH_USERS,
  GET_REPOSE,
  CLEAR_USERS,
  SET_LOADING,
  GET_USER
} from "../types";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const withCredo = url => {
  return `${url}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
};

export const GithubState = ({ children }) => {
  const initialState = {
    user: {},
    users: [],
    loading: false,
    repose: []
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  const search = async value => {
    setLoading();

    const response = await axios.get(
      withCredo(`https://api.github.com/search/users?q=${value}&`)
    );
    console.log(value);
    dispatch({ type: SEARCH_USERS, payload: response.data.items });
  };

  const getUser = async name => {
    setLoading();

    const response = await axios.get(
      withCredo(`https://api.github.com/users/${name}?`)
    );

    dispatch({ type: GET_USER, payload: response.data });
  };

  const getRepose = async name => {
    setLoading();

    const response = await axios.get(
      withCredo(`https://api.github.com/users/${name}/repos?per_page=5&`)
    );

    dispatch({ type: GET_REPOSE, payload: response.data });
  };

  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const setLoading = () => dispatch({ type: SET_LOADING });

  const { user, users, repose, loading } = state;

  return (
    <GithubContext.Provider
      value={{
        setLoading,
        search,
        getUser,
        getRepose,
        clearUsers,
        user,
        users,
        repose,
        loading
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
