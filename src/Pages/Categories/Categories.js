import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Card from "../../components/card/Card";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

function Categories({ match }) {
  const urlName = match.params.urlName;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setcategoryName] = useState("");

  useEffect(() => {
    axios
      .get(`https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/blogs/byCategory/${urlName}`)
      .then((response) => {
        setBlogs(response.data);
        setcategoryName(response.data[0].category.name);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [blogs]);

  return (
    <div>
      <Container>
        {/* It is usefull when we fetch data from server */}
        <h1 style={{ textAlign: "center" }}>{categoryName}</h1>
        {loading ? (
          <h1 className="text-center">Loading... Please Wait...</h1>
        ) : blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <Col key={index} md={50} sm={50} xs={12}>
              <Card data={blog} />
            </Col>
          ))
        ) : (
          <h1 className="text-center">No blogs found.</h1>
        )}
      </Container>
    </div>
  );
}
export default Categories;
