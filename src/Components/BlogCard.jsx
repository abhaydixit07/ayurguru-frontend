import React from 'react';
import { Link } from 'react-router-dom';
const BlogCard = ({ id, title, excerpt, author, date }) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow m-5">
        <h2 className="text-2xl font-serif text-brown-800">{title}</h2>
        <p className="text-brown-600 mt-4">{excerpt}</p>
        <div className="flex justify-between text-brown-500 mt-4">
          <span>By: {author}</span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
};
export default BlogCard;