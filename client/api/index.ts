import axios from "axios";
import aspida from "@aspida/axios";
import sdk from "../api/$api";
import {STORAGE_KEY_TEAM, STORAGE_KEY_TOKEN} from "@/lib/constants.ts";

const http = axios.create({ baseURL: "http://localhost:8080/api" });

http.interceptors.request.use(
  config => {
    // Assume you fetch your token from localStorage or a similar place
    const token = localStorage.getItem(STORAGE_KEY_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const team = localStorage.getItem(STORAGE_KEY_TEAM);
    if(team) {
      config.headers["X-Team-Id"] = team;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

export const api = sdk(aspida(http));

export interface IResponseError {
  response: {
    data: {
      error: string;
      message: string;
      statusCode: number;
    };
  };
}