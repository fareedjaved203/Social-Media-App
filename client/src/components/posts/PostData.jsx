import React, { Suspense, useState } from "react";

const CommentsPerPost = React.lazy(() => import("../comments/CommentsPerPost"));
import PostForm from "./PostForm";

import "../../assets/styles/postData.css";

const PostData = ({
  value,
  userId,
  editingPostId,
  setUpdatedTitle,
  setUpdatedContent,
  handleRemovePost,
  handleUpdatePost,
  editPost,
  updatedTitle,
  updatedContent,
}) => {
  const [showComments, setShowComments] = useState(false);
  return (
    <div className="post-body">
      <div className="row">
        <div className="col">
          <div className="user-name">
            {" "}
            <b>Name: {value.name}</b>
            <b>Email: {value.email}</b>
          </div>
        </div>
        {userId == value.userId && (
          <>
            <div className="col">
              {editingPostId === value.id ? null : (
                <button
                  className="delete-btn"
                  onClick={() => handleRemovePost(value.id)}
                >
                  Delete
                </button>
              )}
            </div>
            <div className="col">
              {editingPostId !== value.id && (
                <button
                  className="update-btn"
                  onClick={() => editPost(value.id, value.title, value.body)}
                >
                  Update
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {editingPostId === value.id ? (
        <PostForm
          title={updatedTitle}
          setTitle={setUpdatedTitle}
          content={updatedContent}
          setContent={setUpdatedContent}
          onSubmit={() => handleUpdatePost(value.id)}
          submitLabel="Save"
        />
      ) : (
        <>
          <div className="post-title">
            {" "}
            <b>Title: </b> {value.title}
          </div>
          <div className="post-content">
            <b>Content: </b>
            {value.body}
          </div>
        </>
      )}
      <button
        className="show-comments"
        onClick={() => setShowComments(!showComments)}
      >
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && (
        <div className="comments">
          <h3>Comments</h3>
          <Suspense fallback={<div>Loading...</div>}>
            <CommentsPerPost value={value} />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default PostData;
