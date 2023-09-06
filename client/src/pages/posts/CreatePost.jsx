import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { showToast } from "../../helpers/showToast.js";
import PostForm from "../../components/posts/PostForm.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/createPost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("post", JSON.stringify(posts));
    }
  }, [posts]);
  if (navigate) {
    alert("Posted Successfully");
    return <Navigate to="/myposts" />;
  }

  const savePost = (e) => {
    e.preventDefault();
    if (title.trim() !== "" && post.trim() !== "") {
      const user_id = JSON.parse(localStorage.getItem("userId"));
      const user_name = JSON.parse(localStorage.getItem("userName"));
      const user_email = JSON.parse(localStorage.getItem("userEmail"));
      setPosts([
        {
          userId: user_id,
          name: user_name,
          email: user_email,
          id: Date.now(),
          title: title,
          body: post,
        },
      ]);
      showToast("Posted Successfully", "success");
      setNavigate(true);
    } else {
      showToast("Please Fill All Fields", "error");
    }
  };

  return (
    <div className="container create-post-container">
      <div className="create-post-body">
        <PostForm
          title={title}
          setTitle={setTitle}
          content={post}
          setContent={setPost}
          onSubmit={savePost}
          submitLabel="Post"
        />
      </div>
    </div>
  );
};

export default CreatePost;
