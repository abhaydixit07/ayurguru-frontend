import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ id, title, excerpt, author, date, img }) => {
  return (
    <Link to={`/blog/${id}`} className="flex justify-center">
      <div className="max-w-md bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300 m-6">
        <img
          src={img}
          alt={title}
          className="object-cover object-center w-full h-56"
        />
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-semibold uppercase text-green-500">
              {author}
            </span>
            <span className="text-xs text-gray-500">{date}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            {title}
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            {excerpt}
          </p>
          <div className="flex justify-end">
            <button className="bg-green-500 text-white text-sm px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors">
              Read More
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
