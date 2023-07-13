import React from "react";
import { Link } from "react-router-dom";

function Card({ data }) {
  const imageUrl = `https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/blogs/images/${data.image}`;
  const userUrl = `https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/user/images/${data.user.image}`;
  const limitedDescription = data.description.substring(0, 300); // Change the character limit as needed

  return (
    <div
      className="card specialCard mx-auto"
      style={{
        width: "70vw", // Change the width value here
        padding: "20px",
        backgroundColor: "rgb(246,246,246)",
        border: "none",
        margin: "15px",
      }}>
      <Link to={`/post/${data.urlName}`}>
        <div>
          <h5
            className="card-title text-black-50"
            style={{ fontWeight: "bold", fontSize: 20 }}>
            {data.name}
          </h5>
          <p
            className="card-title text-black-50"
            style={{ fontSize: 20, color: "black" }}>
            {data.category.name}
          </p>
        </div>
        <img src={imageUrl} alt="..." width="80%" height={400} />
        <div className="card-body text-center"></div>
      </Link>
      <div
        dangerouslySetInnerHTML={{
          __html: `<div style="color: black">${limitedDescription}...</div>`,
        }}></div>
      <Link
        to={`/author/${data.user._id}`}
        style={{ fontSize: 20, color: "black" }}>
        <img
          src={userUrl}
          alt="..."
          width={30}
          height={30}
          style={{ borderRadius: "50%", marginRight: 20 }}
        />
        {data.user.name}
      </Link>
    </div>
  );
}
export default Card;
