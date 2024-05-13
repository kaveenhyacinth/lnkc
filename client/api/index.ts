import axios from "axios";
import aspida from "@aspida/axios";
import sdk from "../api/$api";

const axiosConfig = { timeout: 3000, baseURL: "http://localhost:8080/api" };
export const api = sdk(aspida(axios, axiosConfig));

export interface IResponseError {
  response: {
    data: {
      error: string;
      message: string;
      statusCode: number;
    };
  };
}