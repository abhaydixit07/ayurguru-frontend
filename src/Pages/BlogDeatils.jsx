import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BlogCard from '../Components/BlogCard';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [similarBlogs, setSimilarBlogs] = useState([]);

  useEffect(() => {
    // Fetch the specific blog by ID
    fetch(`https://api.npoint.io/b1bbae5a8e2b1ea80f69/${id - 1}`)
      .then(response => response.json())
      .then(data => setBlog(data));

    // Fetch similar blogs
    fetch('https://api.npoint.io/b1bbae5a8e2b1ea80f69')
      .then(response => response.json())
      .then(data => {
        const filteredBlogs = data.filter((b) => b.id !== Number(id));
        setSimilarBlogs(filteredBlogs.slice(1, 3)); // Show only top two blogs
      });
  }, [id]);

  if (!blog)
    return (
      <div className='flex justify-center'>
        <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-spin z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)]">
          <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row">
      {/* Blog Content Section */}
      <div className="w-full md:w-3/4 md:pl-8 mt-8 md:mt-0">
        {/* Blog Title */}
        <h1 className="text-5xl font-extrabold text-green-900 leading-snug mb-6">
          {blog.title}
        </h1>

        {/* Author and Date */}
        <div className="flex items-center gap-4 mb-6">
          <p className="text-gray-700 text-lg">By: <span className="font-medium">{blog.author}</span></p>
          <p className="text-gray-500 text-sm">{new Date(blog.publishedDate).toDateString()}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Blog Content */}
        <div className="text-gray-800 leading-relaxed text-lg pr-16">
          {blog.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Sidebar Section */}
      <div className="w-full md:w-1/4">
        {/* Circular Blog Image */}
        <div className="flex justify-center mb-8">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="rounded-full w-48 h-48 object-cover mx-auto"
          />
        </div>

        {/* Similar Blogs */}
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-4">Similar Blogs</h2>
          {similarBlogs.map((similarBlog) => (
            <BlogCard
              key={similarBlog.id}
              id={similarBlog.id}
              title={similarBlog.title}
              excerpt={similarBlog.excerpt}
              author={similarBlog.author}
              date={similarBlog.publishedDate}
              img={similarBlog.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
