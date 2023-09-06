import React, { useState, useEffect, useContext, memo } from "react";
import { ErrorBoundary } from "react-error-boundary";

import {
  storeCommentsInLocalStorage,
  removeComment,
  updateComment,
  addComment,
  setEditingComment,
  fetchComments,
} from "../../helpers/commentHelpers";
import { UserContext } from "../../context/UserContext";

import "react-toastify/dist/ReactToastify.css";

const CommentsPerPost = memo(({ value }) => {
  const { userName, userEmail } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [updatedComment, setUpdatedComment] = useState("");
  const [userComment, setUserComment] = useState("");
  const [newComment, setNewComment] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchComments(value.id, setComments);
    const allUsers = JSON.parse(localStorage.getItem("users"));
    if (allUsers) {
      const data = Object.keys(allUsers);
      setUserComment(data[0]);
    }
  }, [value.id]);

  useEffect(() => {
    if (comments.length > 0) {
      storeCommentsInLocalStorage(value.id, comments);
      setEmail(JSON.parse(localStorage.getItem("userEmail")));
    }
  }, [comments]);

  const changeCommentValue = (e) => {
    setNewComment(e.target.value);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <>
        <input
          type="text"
          placeholder="New Comment"
          onChange={changeCommentValue}
          style={{ color: "black" }}
          value={newComment}
        />
        <button
          onClick={() =>
            addComment(
              value.id,
              newComment,
              comments,
              setComments,
              setNewComment
            )
          }
        >
          Submit
        </button>
        {comments.map((value, index) => (
          <div key={index} className="comment-body">
            <div className="user-name">
              {" "}
              <b>Name:</b> {value.name}
              <b>Email:</b> {value.email}
            </div>

            {editingCommentId === value.id ? (
              <>
                <input
                  type="text"
                  placeholder="Updated Comment"
                  value={updatedComment}
                  style={{ color: "black" }}
                  onChange={(e) => setUpdatedComment(e.target.value)}
                />
                <button
                  onClick={() =>
                    updateComment(
                      value.id,
                      updatedComment,
                      comments,
                      setComments,
                      setEditingCommentId
                    )
                  }
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <div className="user-comment">
                  {" "}
                  <b>Comment:</b> {value.body}
                </div>
                {email == value.email ? (
                  <>
                    {" "}
                    <button
                      onClick={() =>
                        setEditingComment(
                          value.id,
                          value.body,
                          setEditingCommentId,
                          setUpdatedComment
                        )
                      }
                    >
                      Update
                    </button>
                    <button
                      onClick={() =>
                        removeComment(
                          value.postId,
                          value.id,
                          comments,
                          setComments
                        )
                      }
                    >
                      Delete
                    </button>
                  </>
                ) : null}
              </>
            )}
            <hr style={{ color: "black" }} />
          </div>
        ))}
      </>
    </ErrorBoundary>
  );

  function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div role="alert">
        <p>Something went wrong in Comments Section:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }
});

export default CommentsPerPost;
