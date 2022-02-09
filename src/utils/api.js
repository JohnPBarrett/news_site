import axios from "axios";

const instance = axios.create({
  baseURL: "https://nodejs-api-example-5959.herokuapp.com/api",
});

export const getArticles = async (params = "") => {
  const response = await instance.get(`/articles${params}`);

  return response.data;
};

export const getArticle = async (id) => {
  const response = await instance.get(`/articles/${id}`);
  return response.data;
};

export const getTopics = async () => {
  const response = await instance.get(`/topics`);
  return response.data;
};
