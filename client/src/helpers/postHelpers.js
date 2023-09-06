import { getPosts } from "../api/postApi";

export const fetchData = async (setPosts, setUserId, setName, localStorage) => {
  try {
    const posts = await getPosts();
    const newPost = localStorage.getItem("post");
    const userId = JSON.parse(localStorage.getItem("userId"));
    setUserId(userId);
    const allUsers = JSON.parse(localStorage.getItem("users"));
    const allPosts = JSON.parse(localStorage.getItem("posts"));
    if (userId && allUsers) {
      const usersData = Object.entries(allUsers);
      usersData.forEach((userEntry) => {
        if (userEntry[1].userId === userId) {
          setName(userEntry[1].name);
        }
      });
    }
    if (allPosts) {
      if (newPost) {
        setPosts([...JSON.parse(newPost), ...allPosts]);
      } else {
        setPosts([...allPosts]);
      }
    } else {
      if (newPost) {
        setPosts([...JSON.parse(newPost), ...posts]);
      } else {
        setPosts(posts);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const removePost = (id, posts, setPosts) => {
  console.log(`post id: ${id}`);
  const data = posts.filter((value) => {
    return value.id !== id;
  });
  setPosts([...data]);
};

export const updatePost = (
  id,
  updatedTitle,
  updatedContent,
  posts,
  setPosts,
  setEditingPostId
) => {
  if (updatedTitle.trim() === "" || updatedContent.trim() === "") {
    alert("Fields Cannot Be Empty");
  } else {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return { ...post, title: updatedTitle, body: updatedContent };
      } else {
        return post;
      }
    });
    setPosts(updatedPosts);
    setEditingPostId(null);
  }
};
