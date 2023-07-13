import React, { memo, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiTwotoneDelete } from "react-icons/ai";

function ShortPost(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/comments/blog/${props.id}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [comments]);

  let date = useMemo(() => new Date(props.date), [props.date]);

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/blogs/${props.id}`)
      .then((response) => {
        console.log(response.data);
      });
  };
  return (
    <Link to={`/Post/${props.urlName}`}>
      <h5 className="list-group-item row">
        <span
          className="d-inline-block col-sm-4 text-primary"
          style={{ width: "25%" }}>
          {props.title}
        </span>
        <span
          className="d-inline-block col-sm-4 text-right text-info"
          style={{ width: "25%" }}>
          {date.toLocaleDateString()}
        </span>
        <span
          className="d-inline-block col-sm-4 text-danger text-right "
          style={{ width: "25%" }}>
          {comments.length}
        </span>
        {props.personal ? (
          <AiTwotoneDelete
            size={30}
            color="red"
            style={{ width: "25%" }}
            onClick={handleDelete}
          />
        ) : (
          ""
        )}
      </h5>
    </Link>
  );
}
export default memo(ShortPost);
