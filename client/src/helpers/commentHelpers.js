import { getComments } from "../api/postApi";

export const fetchCommentsFromLocalStorage = (postId) => {
  return JSON.parse(localStorage.getItem(`comments-${postId}`));
};

export const storeCommentsInLocalStorage = (postId, comments) => {
  localStorage.setItem(`comments-${postId}`, JSON.stringify(comments));
};

export const removeCommentFromLocalStorage = (postId, commentId) => {
  const data = JSON.parse(localStorage.getItem(`comments-${postId}`));
  const updatedData = data.filter(
    (value) => !(value.postId === postId && value.id === commentId)
  );
  localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedData));
};

export const removeComment = (postId, id, comments, setComments) => {
  const updatedComments = comments.filter((comment) => {
    if (comment.postId === postId) {
      removeCommentFromLocalStorage(comment.postId, id);
    }
    return comment.id != id;
  });
  setComments(updatedComments);
};

export const updateComment = (
  id,
  updatedComment,
  comments,
  setComments,
  setEditingCommentId
) => {
  if (updatedComment.trim() === "") {
    alert("Comment Cannot be Empty");
  } else {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, body: updatedComment };
      } else {
        return comment;
      }
    });
    setComments(updatedComments);
    setEditingCommentId(null);
  }
};

export const addComment = (
  postId,
  newComment,
  comments,
  setComments,
  setNewComment
) => {
  const userEmail = JSON.parse(localStorage.getItem("userEmail"));
  const userName = JSON.parse(localStorage.getItem("userName"));
  console.log(userEmail);
  console.log(userName);
  if (newComment.trim() === "") {
    alert("Comment Cannot be Empty");
  } else {
    const newCommentId = comments.length + 1;
    const newCommentObject = {
      postId: postId,
      id: newCommentId,
      name: userName,
      email: userEmail,
      body: newComment,
    };
    setComments([newCommentObject, ...comments]);
    setNewComment("");
  }
};

export const fetchComments = async (id, setComments) => {
  const storedComments = fetchCommentsFromLocalStorage(id);
  if (Array.isArray(storedComments)) {
    setComments(storedComments);
  } else {
    const comments = await getComments(id);
    if (Array.isArray(comments)) {
      setComments(comments);
      storeCommentsInLocalStorage(id, comments);
    }
  }
};

export const setEditingComment = (
  id,
  body,
  setEditingCommentId,
  setUpdatedComment
) => {
  setEditingCommentId(id);
  setUpdatedComment(body);
};
