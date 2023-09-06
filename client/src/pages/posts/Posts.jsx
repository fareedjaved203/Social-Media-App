import React, { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { fetchData } from "../../helpers/postHelpers";
import PostData from "../../components/posts/PostData";

import "../../assets/styles/posts.css";

const Posts = () => {
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

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="container post-container">
        {posts.map((value, index) => (
          <PostData
            key={index}
            value={value}
            editingPostId={editingPostId}
            setUpdatedTitle={setUpdatedTitle}
            setUpdatedContent={setUpdatedContent}
          />
        ))}
      </div>
    </ErrorBoundary>
  );
};
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong in Posts Section:</p>
      <pre>{error.message}</pre>
      {/* <button onClick={resetErrorBoundary}>Try again</button> */}
    </div>
  );
}

export default Posts;
