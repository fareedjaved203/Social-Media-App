import React, { useState, useEffect, useCallback } from "react";
import { ToastContainer } from "react-toastify";

import { fetchData, removePost, updatePost } from "../../helpers/postHelpers";
import PostData from "../../components/posts/PostData";

import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/posts.css";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(0);
  const [email, setEmail] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem("userEmail")));
    fetchData(setPosts, setUserId, setName, localStorage);
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("posts", JSON.stringify(posts));
      localStorage.removeItem("post");
    }
  }, [posts]);

  const editPost = (id, title, content) => {
    setEditingPostId(id);
    setUpdatedTitle(title);
    setUpdatedContent(content);
  };

  const handleRemovePost = useCallback(
    (id) => {
      removePost(id, posts, setPosts);
    },
    [posts]
  );

  const handleUpdatePost = useCallback(
    (id) => {
      updatePost(
        id,
        updatedTitle,
        updatedContent,
        posts,
        setPosts,
        setEditingPostId
      );
    },
    [updatedTitle, updatedContent, posts]
  );

  return (
    <div className="container post-container">
      <ToastContainer />
      {posts.map((value, index) => {
        return (
          value.email === email && (
            <PostData
              key={index}
              value={value}
              userId={userId}
              editingPostId={editingPostId}
              setUpdatedTitle={setUpdatedTitle}
              setUpdatedContent={setUpdatedContent}
              handleRemovePost={handleRemovePost}
              handleUpdatePost={handleUpdatePost}
              editPost={editPost}
              updatedTitle={updatedTitle}
              updatedContent={updatedContent}
            />
          )
        );
      })}
    </div>
  );
};

export default MyPosts;
