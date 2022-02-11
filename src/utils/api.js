import axios from "axios";

const instance = axios.create({
  baseURL: "https://nodejs-api-example-5959.herokuapp.com/api",
});

export const getArticles = async (params) => {
  const response = await instance.get(`/articles${params}`);

  return response.data;
};

export const getArticle = async (article_id) => {
  const response = await instance.get(`/articles/${article_id}`);
  return response.data;
};

export const getTopics = async () => {
  const response = await instance.get(`/topics`);
  return response.data;
};

export const getArticleComments = async (article_id) => {
  const response = await instance.get(`/articles/${article_id}/comments`);
  return response.data;
};

export const patchArticleVotes = async (article_id, voteType) => {
  let vote = {};
  if (voteType === "inc") {
    vote.inc_votes = 1;
  } else if (voteType === "dec") {
    vote.inc_votes = -1;
  }
  const response = await instance.patch(`/articles/${article_id}`, vote);

  return response.data;
};

export const postComment = async (article_id, data) => {
  const response = await instance.post(
    `/articles/${article_id}/comments`,
    data
  );
  console.log(response);
  return response;
};
