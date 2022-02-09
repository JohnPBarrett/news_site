import axios from "axios";

const instance = axios.create({
  baseURL: "https://nodejs-api-example-5959.herokuapp.com/api",
});

export const getEndpoints = async () => {
  console.log(await instance.get("/articles"));
};
