import React, { useEffect } from "react";
import "./PostPage.css";
import DOMPurify from "dompurify";

function PostCard({ data }) {
  const imgageUrl = `https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/blogs/images/${data.image}`;
  const userUrl = `https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/user/images/${data.user.image}`;

  const sanitizedDescription = DOMPurify.sanitize(data.description);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <h1>{data.name}</h1>
      <p className="title text-secondary">
        Date: {new Date(data.createdAt).toLocaleDateString()}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}>
        Author :{" "}
        <img
          src={userUrl}
          alt="..."
          width={20}
          height={20}
          style={{ borderRadius: "50%", marginLeft: 10, marginRight: 5 }}
        />
        <p> {data.user.name}</p>
      </div>
      <img src={imgageUrl} alt="..." width="60%" />

      <div>
        <div className="mainContent mx-auto">
          <div
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            className="sanitizedDescription"></div>
        </div>
      </div>
    </div>
  );
}
export default PostCard;
