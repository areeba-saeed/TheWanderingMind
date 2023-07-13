import React, { memo } from "react";
import Post from "../ShortPost/ShortPost";
function UserPostList({ posts, personal }) {
  return (
    <ul className="list-group">
      {posts.length === 0 ? (
        <h1 className="text-center">loading.... </h1>
      ) : (
        posts.map((post) => {
          return (
            <Post
              key={post.id}
              title={post.name}
              date={post.createdAt}
              id={post._id}
              personal={personal}
              urlName={post.urlName}
            />
          );
        })
      )}
    </ul>
  );
}

export default memo(UserPostList);
