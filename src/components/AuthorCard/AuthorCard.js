import React, { memo } from "react";

function AuthorCard({ author, numPosts }) {
  return (
    <div className="cardProfile">
      <img
        src={`https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/user/images/${author.image}`}
        alt={author.name}
        style={{ width: "100%" }}
      />
      <h3>{author.name}</h3>
      <p>POSTS : {numPosts}</p>
    </div>
  );
}

export default memo(AuthorCard);
