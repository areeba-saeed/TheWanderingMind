import React, { useState, useEffect, memo, useCallback } from "react";
import { Link } from "react-router-dom";
function Comment({ data }) {
  return (
    <li className="media p-4">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to={`/Profile/${data.user._id}`}>
          <img
            src={`https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/user/images/${data.user.image}`}
            className="mr-3 text-center"
            alt="..."
            width="50px"
          />
        </Link>
        <div className="media-body" style={{ marginTop: 5 }}>
          <h5 className="mt-0 mb-1">{data.user.name}</h5>
          <span className="mt-0 mb-1">{data.comment}</span>
        </div>
      </div>
    </li>
  );
}

export default memo(Comment);
