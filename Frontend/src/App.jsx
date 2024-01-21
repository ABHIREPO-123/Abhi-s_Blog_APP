import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import { Toaster } from "react-hot-toast";
import About from "./pages/About";
import BlogInfo from "./pages/BlogInfo";
import Reset from "./pages/Reset";
function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route exact path="/" element={<Blogs />} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/my-blogs" element={<UserBlogs />} />
        <Route exact path="/blog-details/:id" element={<BlogDetails />} />
        <Route exact path="/create-blog" element={<CreateBlog />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/bloginfo/:id" element={<BlogInfo />} />
        <Route exact path="/reset-password" element={<Reset/>} />
      </Routes>
    </>
  );
}

export default App;
