import { useState, useEffect } from 'react';
import BlogCard from '../Components/BlogCard';
import { ClipLoader } from 'react-spinners';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.npoint.io/b1bbae5a8e2b1ea80f69')
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#4CAF50" loading={loading} size={50} />
        </div>
      ) : (
        <div className="flex gap-6 justify-center items-center flex-wrap">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              excerpt={blog.excerpt}
              author={blog.author}
              date={blog.publishedDate}
              img={blog.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
