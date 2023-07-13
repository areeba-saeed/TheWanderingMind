import React, { useState, useEffect, useCallback } from "react";
import "./profile.css";

import Footer from "../../components/Footer/Footer";
import NavigationBar from "../../components/NavBar/NavigationBar";
import db from "../../utils/db.json";
import AuthorCard from "../../components/AuthorCard/AuthorCard";
import FilterHeader from "../../components/FilterHeader/FilterHeader";
import UserPostList from "../../components/UserPostsList/UserPostList";
import axios from "axios";

function Profile({ match }) {
  const [posts, setPosts] = useState([]); // for Seting Post
  const [activeButton, setActiveButton] = useState(""); // for active Button
  const [author, setAuthor] = useState(""); // for active Button

  // fetching user
  const fetchUser = useCallback(async (id) => {
    const user = db.authors[id];
    setAuthor(user);
  }, []);

  // for retriveing post
  useEffect(() => {
    axios
      .get(
        `https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/blogs/byUser/${match.params.id}`
      )
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
      .get(
        `https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/users/${match.params.id}`
      )
      .then((response) => {
        setAuthor(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [author]);

  // Sorting By Assending Date
  const ascDate = useCallback(() => {
    setActiveButton("ascDate");
    let data = posts;

    // bubble sort for shorting time complexity = O(n * n)
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j].datePublished > data[j + 1].datePublished) {
          let temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;
        }
      }
    }

    setPosts([...data]);
  }, [posts]);

  // Sorting By decending Date
  const dscDate = useCallback(() => {
    setActiveButton("dscDate");
    let data = posts;

    // bubble sort for shorting time complexity = O(n * n)

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j].datePublished > data[j + 1].datePublished) {
          let temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;
        }
      }
    }
    setPosts([...data.reverse()]);
  }, [posts]);

  // Sorting By Assending Like
  const ascLike = useCallback(() => {
    setActiveButton("ascLike");
    let data = posts;

    // bubble sort for shorting time complexity = O(n * n)

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j].numLikes > data[j + 1].numLikes) {
          let temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;
        }
      }
    }

    setPosts([...data]);
  }, [posts]);

  // Sorting By decending Like
  const dscLike = useCallback(() => {
    setActiveButton("dscLike");
    let data = posts;

    // bubble sort for shorting time complexity = O(n * n)

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j].numLikes > data[j + 1].numLikes) {
          let temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;
        }
      }
    }

    setPosts([...data.reverse()]);
  }, [posts]);

  return (
    <div>
      {/* Author Details */}
      <AuthorCard author={author} numPosts={posts.length} />

      <div className="container">
        <h3 className="pt-4 pl-4 pb-3">Posts</h3>

        {/* Filter Header */}
        <FilterHeader personal={false} />

        <UserPostList posts={posts} personal={false} />
      </div>
    </div>
  );
}
export default Profile;
