import React, { useState, useEffect, useCallback } from "react";
import PostCard from "../../components/postCard/PostCard";
import "./PostPage.css";
import Comment from "../../components/comments/Comment";
import axios from "axios";
function PostPage() {
  const path = window.location.pathname;
  const urlName = path.substring(path.lastIndexOf("/") + 1);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const id = localStorage.getItem("user");

  useEffect(() => {
    axios
      .get(`https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/blogs/find/${urlName}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [post]);

  useEffect(() => {
    if (post._id) {
      axios
        .get(`https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/comments/blog/${post._id}`)
        .then((response) => {
          setComments(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [post, comments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      const data = {
        comment: comment,
        user: id,
        blog: post._id,
      };

      axios
        .post("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/comments", data)
        .then((response) => {
          setComment("");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please login ");
    }
  };

  return (
    <div>
      {loading ? <h1>Loading....</h1> : <PostCard data={post} />}

      <h4 className="mt-4 text-center">Comments</h4>
      <form
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
        onSubmit={handleSubmit}>
        <div style={{ width: "40%", display: "flex" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Type comment..."
            value={comment}
            required
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            type="submit"
            style={{ width: "30%", marginLeft: 10 }}
            className="btn btn-primary">
            Post
          </button>
        </div>
      </form>
      <div className="comment-box d-flex justify-content-center">
        <br></br>
        <ul className="list-unstyled m-4 " style={{ width: "40%" }}>
          {loading ? (
            <h1>loading</h1>
          ) : comments.length === 0 ? (
            <h1>No comment </h1>
          ) : (
            comments.map((comment, index) => (
              <Comment key={index} data={comment} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default PostPage;
