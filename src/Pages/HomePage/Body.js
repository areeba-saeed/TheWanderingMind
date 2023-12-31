import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Card from "../../components/card/Card";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

function Body() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/blogs")
      .then((response) => {
        setBlogs(response.data);
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

        {loading ? (
          <h1 className="text-center">Loading... Please Wait...</h1>
        ) : (
          blogs.map((blog, index) => {
            return (
              <Col key={index} md={50} sm={50} xs={12}>
                <Card data={blog} />
              </Col>
            );
          })
        )}
      </Container>
    </div>
  );
}
export default Body;
