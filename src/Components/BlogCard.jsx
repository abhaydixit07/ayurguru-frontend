import { Link } from 'react-router-dom';

const BlogCard = ({ id, title, excerpt, author, date, img }) => {
  return (
    <Link to={`/blog/${id}`} className="group h-full">
      <div className="bg-white max-w-[300px] min-w-[200px] min-h-[400px] max-h-[400px] rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-200 hover:-translate-y-1 h-full flex flex-col">
        <div className="relative overflow-hidden">
          <img
            src={img}
            alt={title}
            className="object-cover object-center w-full h-48 transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
              {author}
            </span>
            <span className="text-xs text-gray-500 font-spacegroteskregular">{date}</span>
          </div>
          <h3 className="text-lg font-spacegrotesksemibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-gray-600 text-sm font-spacegroteskregular mb-4 line-clamp-3 flex-grow">
            {excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="inline-flex items-center text-green-600 font-spacegroteskmedium text-sm group-hover:text-green-700 transition-colors duration-200">
              Read Article
              <svg className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
