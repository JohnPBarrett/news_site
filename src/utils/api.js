import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://nodejs-api-example-5959.herokuapp.com/api'
});

export const getArticles = async (params) => {
  const response = await instance.get(`/articles`, { params });

  return response.data;
};

export const getArticle = async (articleId) => {
  const response = await instance.get(`/articles/${articleId}`);
  return response.data;
};

export const getTopics = async () => {
  const response = await instance.get(`/topics`);
  return response.data;
};

export const getComments = async () => {
  const response = await instance.get('/comments');
  return response.data;
};

export const getArticleComments = async (articleId, params) => {
  const response = await instance.get(`/articles/${articleId}/comments`, { params });
  return response.data;
};

export const patchArticleVotes = async (articleId, voteType, voteAmount) => {
  const vote = {};
  if (voteType === 'inc') {
    vote.inc_votes = voteAmount;
  } else if (voteType === 'dec') {
    vote.inc_votes = -voteAmount;
  }
  const response = await instance.patch(`/articles/${articleId}`, vote);

  return response.data;
};

export const patchCommentVotes = async (commentId, voteType, voteAmount) => {
  const vote = {};
  if (voteType === 'inc') {
    vote.inc_votes = voteAmount;
  } else if (voteType === 'dec') {
    vote.inc_votes = -voteAmount;
  }
  const response = await instance.patch(`/comments/${commentId}`, vote);

  return response.data;
};

export const postComment = async (articleId, data, token) => {
  const response = await instance.post(`/articles/${articleId}/comments`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response;
};

export const deleteComment = async (commentId, token) => {
  await instance.delete(`/comments/${commentId}`, {
    headers: {
      Authorization: `Bearere ${token}`
    }
  });
};

export const registeruser = async (data) => {
  const response = await instance.post('/users', data);
  return response;
};

export const loginUser = async (data) => {
  const response = await instance.post('/login', data);

  return response;
};
