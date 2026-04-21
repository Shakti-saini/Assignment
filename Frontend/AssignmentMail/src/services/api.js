import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:2001/api/email/send",
  timeout: 10000,
});

export const sendEmailAPI = async (data) => {
  try {
    const res = await API.post("", data, {   // ✅ no extra path
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw { message: "Server not responding" };
    }
  }
};