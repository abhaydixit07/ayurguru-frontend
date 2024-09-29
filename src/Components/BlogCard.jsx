import React from 'react';
import { Link } from 'react-router-dom';
const BlogCard = ({ id, title, excerpt, author, date ,img}) => {
  return (
    <Link to={`/blog/${id}`} className='flex justify-center'>
      <div className=" p-6 rounded-md shadow-md bg-green-50 dark:bg-gray-50 dark:text-gray-900 m-7">
	<img src={img} alt="" className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
	<div className="mt-6 mb-2">
		<span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600">{author}</span>
		<h2 className="text-xl font-semibold tracking-wide">{title}</h2>
	</div>
	<p className="dark:text-gray-800">{excerpt}</p>
</div>
      {/* <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow m-5">
        <h2 className="text-2xl font-serif text-brown-800"></h2>
        <p className="text-brown-600 mt-4"></p>
        <div className="flex justify-between text-brown-500 mt-4">
          <span>By: </span>
          <span>{date}</span>
        </div>
      </div> */}
    </Link>
  );
};
export default BlogCard;