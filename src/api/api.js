import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = process.env.REACT_APP_API_URL || "https://21-back.vercel.app/";
// const reserv = localStorage.getItem("token");
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY3ZmIwNmU2NWM4NjViZWQ0MDY2YWIiLCJlbWFpbCI6IjIxdHYuZGV2ZWxvcG1lbnRAZ21haWwuY29tIiwiaWF0IjoxNjUyOTU3NDE3LCJleHAiOjE2NTM1NjIyMTd9.PcLJ-MFRRU1QAD09U_lga2HxBjUGX36oN1ruAw40nCM";
export function getRequest(path) {
  return axios({ url: BASE_URL + path, method: "get" });
}
export function postRequest(path, data) {
  return axios({
    url: BASE_URL + path,
    method: "post",
    headers: {
      authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    data,
  });
}
export function sendEmail(data, message) {
  return axios({
    url: BASE_URL + "send-email-21tv",
    method: "post",
    data,
  });
}
export function putRequest(path, data) {
  return axios({
    url: BASE_URL + path,
    method: "put",
    headers: {
      authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    data,
  });
}
export function deleteRequest(path) {
  return axios({
    url: BASE_URL + path,
    method: "delete",
    headers: {
      authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}
