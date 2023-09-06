import axios from "axios";
const POST_URL = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = async () => {
  const response = await axios.get(POST_URL);
  return response.data;
};

export const getComments = async (postId) => {
  const response = await axios.get(`${POST_URL}/${postId}/comments`);
  return response.data;
};
