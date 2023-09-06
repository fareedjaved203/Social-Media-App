import React from "react";
import InputField from "./InputField";

const PostForm = ({
  title,
  setTitle,
  content,
  setContent,
  onSubmit,
  submitLabel,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <InputField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Title..."
      />
      <br />
      <InputField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter Content..."
        type="textarea"
      />
      <button type="submit">{submitLabel}</button>
    </form>
  );
};

export default PostForm;
