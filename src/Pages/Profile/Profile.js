import React, { useState, useEffect } from "react";
import "../ProfilePage/profile.css";
import AuthorCard from "../../components/AuthorCard/AuthorCard";
import FilterHeader from "../../components/FilterHeader/FilterHeader";
import UserPostList from "../../components/UserPostsList/UserPostList";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import NewPost from "../../components/NewPost/NewPost";

function Profile() {
  const [posts, setPosts] = useState([]); // for Seting Post
  const [author, setAuthor] = useState(""); // for active Button
  const [newPost, setNewPost] = useState(false); // for active Button
  const id = localStorage.getItem("user");

  // for retriveing post
  useEffect(() => {
    axios
      .get(`https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/blogs/byUser/${id}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [posts]);

  //for retriving user
  useEffect(() => {
    axios
      .get(`https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/users/${id}`)
      .then((response) => {
        setAuthor(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [author]);

  return (
    <div>
      {/* Author Details */}
      <AuthorCard author={author} numPosts={posts.length} />

      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 10px",
          }}>
          <h3 className="pt-4 pl-4 pb-3">Posts</h3>
          <AiOutlinePlus
            onClick={() => setNewPost(!newPost)}
            size={40}
            color="#007bff"
            style={{ cursor: "pointer" }}
          />
        </div>
        {newPost ? <NewPost id={id} /> : ""}
        {/* Filter Header */}
        <FilterHeader personal={true} />

        <UserPostList posts={posts} personal={true} />
      </div>
    </div>
  );
}
export default Profile;
