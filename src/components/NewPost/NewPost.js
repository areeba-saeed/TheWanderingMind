import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewPost = ({ id }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategroy] = useState("");
  const [description, setDescription] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    axios
      .get("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/categories")
      .then((response) => {
        setAllCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // text formatting options
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // header styles
      [{ list: "ordered" }, { list: "bullet" }], // lists
      ["link", "image"], // link and image options
      [{ color: [] }], // color option
      [{ align: [] }], // text alignment option
      [{ size: ["small", false, "large", "huge"] }],
      [{ font: [] }], // custom font style option
      ["clean"], // remove formatting
    ],
  };

  const quillFormats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "header",
    "list",
    "bullet",
    "link",
    "image",
    "color",
    "align",
    "font",
    "size",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("user", id);
    axios
      .post("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/blogs", formData)
      .then((response) => {
        console.log(response.data);
        setName("");
        setDescription("");
        setCategroy("");
        setErrorMessage("Blog posted");
        setColor("green");
        setTimeout(() => {
          setErrorMessage("");
          setColor("");
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          setErrorMessage(error.response.data);
          setColor("red");
        }
      });
  };

  return (
    <div>
      {" "}
      <p style={{ fontSize: 20, color: color }}>{errorMessage}</p>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <form style={{ width: "30%" }} onSubmit={handleSubmit}>
          <div class="form-outline mb-4">
            <label class="form-label" for="form2Example1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name..."
              id="form2Example1"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              class="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="selectInput" className="form-label">
              Select category:
            </label>
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategroy(e.target.value)}
              id="selectInput">
              <option value="">-- Select --</option>
              {allCategories.map((row) => (
                <option value={row._id}>{row.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="selectInput" className="form-label">
              Description:
            </label>
            <ReactQuill
              value={description}
              onChange={(value) => setDescription(value)}
              modules={quillModules}
              formats={quillFormats}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fileInput" className="form-label">
              Profile picture:
            </label>
            <input
              type="file"
              className="form-control"
              id="fileInput"
              onChange={(e) => setImage(e.target.files[0])}
              accept=".jpg, .jpeg, .png"
            />
          </div>

          <button type="submit" class="btn btn-primary btn-block mb-4">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
