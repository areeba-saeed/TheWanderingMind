import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Body from "./Pages/HomePage/Body";
import AuthorPage from "./Pages/ProfilePage/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostPage from "./Pages/PostPage/PostPage";
import NavigationBar from "./components/NavBar/NavigationBar";
import Footer from "./components/Footer/Footer";
import Login from "./Pages/Connect/Login";
import Register from "./Pages/Connect/Register";
import Profile from "./Pages/Profile/Profile";
import Categories from "./Pages/Categories/Categories";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Body} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/category/:urlName" component={Categories} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/author/:id" component={AuthorPage} />
          <Route exact path="/Post/:postId" component={PostPage} />
          <Route exact path="/post/:urlName" component={PostPage} />
        </Switch>
        <Footer />
        {/* <Body/> */}
      </Router>
    </div>
  );
}

export default App;
