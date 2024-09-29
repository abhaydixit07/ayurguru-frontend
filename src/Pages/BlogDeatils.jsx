import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BlogCard from '../Components/BlogCard';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [similarBlogs, setSimilarBlogs] = useState([]);

  useEffect(() => {
    // Fetch the specific blog by ID
    fetch(`https://api.npoint.io/b1bbae5a8e2b1ea80f69/${id-1}`)
      .then(response => response.json())
      .then(data => setBlog(data));

    // Fetch similar blogs
    fetch('https://api.npoint.io/b1bbae5a8e2b1ea80f69')
      .then(response => response.json())
      .then(data => setSimilarBlogs(data.filter((b) => b.id !== Number(id))));
  }, [id]);

  if (!blog) return <div className='flex justify-center'><div
  class="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]"
>
  <span
    class="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"
  >
  </span>
</div></div>;

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      
      
      <div className="w-full md:w-3/4 md:pl-8 mt-8 md:mt-0">
  {/* Blog Heading */}
  <h1 className="text-4xl font-serif text-brown-800 mb-4">{blog.title}</h1>
  <div className="flex flex-wrap gap-2">
      {blog.tags.map((tag, index) => (
        <span
          key={index}
          className="bg-gray-300 text-brown-700 px-3 py-1 rounded-full text-sm"
        >
          {tag}
        </span>
      ))}
    {/* </div> */}
  </div>
  {/* Author Name */}
  <p className="text-brown-500 text-lg my-6">Written by: {blog.author}</p>

  {/* Blog Content */}
  <p className="text-brown-600 mb-6">{blog.content}</p>

  {/* Tags Section */}
  {/* <div className="bg-gray-200 p-4 rounded-lg mt-4"> */}
    {/* <h3 className="text-lg font-semibold text-brown-700 mb-2">Tags:</h3> */}
    
  </div>
  <div className="w-full md:w-1/4">
        {/* Circular Image */}
        <div className='flex justify-center'>
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="rounded-full w-48 h-48 object-cover mx-auto md:mx-0"
        />
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-serif text-green-700 mb-4">Similar Blogs</h2>
          {similarBlogs.map((similarBlog) => (
            <BlogCard
              key={similarBlog.id}
              id={similarBlog.id}
              title={similarBlog.title}
              excerpt={similarBlog.excerpt}
              author={similarBlog.author}
              date={similarBlog.publishedDate}
            />
          ))}
        </div>
      </div>
  </div>

  );
};

export default BlogDetail;
