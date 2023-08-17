import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setBody, setTitle } from "../globalStates/blogSlice";
import axios from "axios";
import config from "../utils/config";

function Home() {
  const dispatch = useDispatch();
  const blogState = useSelector((store) => {
    return store.blog;
  });
  const addNewBlog = async () => {
    let data = {
      email: config.userEmail,
      title: blogState.title,
      body: blogState.body,
    };
    try {
      let response = await axios.post(config.ipAddress + `/addblog`, data, {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBlogs = async () => {
    try {
      let response = await axios.post(
        config.ipAddress + `/getblogs`,
        { email: config.userEmail },
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div>
      <Navbar />

      <section>
        <div className="flex justify-center">
          <form className="w-full p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Add Your Blog</h2>

            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full mt-1 p-2 border rounded-lg"
                value={blogState.title}
                onChange={(e) => dispatch(setTitle(e.target.value))}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="body" className="block text-sm font-medium">
                Body
              </label>
              <textarea
                type="text"
                id="body"
                className="w-full mt-1 p-2 border rounded-lg"
                rows={5}
                value={blogState.body}
                onChange={(e) => dispatch(setBody(e.target.value))}
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-8 rounded-lg"
              onClick={addNewBlog}
            >
              Add
            </button>
          </form>
        </div>
      </section>

      <section className="p-5">
        <h1 className="text-xl font-bold mb-4">Your Blogs</h1>
        <div className="bg-whitep-4 rounded-md shadow-lg py-5 px-4 border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Title</h2>
          <p className="text-gray-600">
            This is the description of the content. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
