import React, { useState, useEffect } from 'react';
import BlogCard from '../Components/BlogCard';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('https://api.npoint.io/b1bbae5a8e2b1ea80f69')
      .then(response => response.json())
      .then(data => setBlogs(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-serif text-center text-green-700 mb-8">Ayurveda Blogs</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            excerpt={blog.excerpt}
            author={blog.author}
            date={blog.publishedDate}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
