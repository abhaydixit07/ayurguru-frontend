import { Link } from 'react-router-dom';

const BlogCard = ({ post, variant = 'default' }) => {
  const { slug, title, excerpt, author, date, cover, tag } = post;

  const isFeatured = variant === 'featured';

  return (
    <Link to={`/blogs/${slug}`} className="group h-full block">
      <article
        className={`bg-white rounded-2xl border border-gray-200/60 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300/70 hover:-translate-y-0.5 h-full flex flex-col ${isFeatured ? 'md:col-span-2' : ''
          }`}
      >
        <div className={`relative overflow-hidden h-48`}>
          <img
            src={cover}
            alt={title}
            className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-spacegroteskmedium bg-white/90 border border-gray-200 text-gray-800 shadow-sm">
              {tag || 'General'}
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs text-gray-600 font-spacegroteskregular">{author}</span>
            <span className="text-xs text-gray-500 font-spacegroteskregular">{date}</span>
          </div>
          <h3 className={`text-gray-900 font-spacegrotesksemibold mb-2 ${isFeatured ? 'text-xl' : 'text-lg'} line-clamp-2 group-hover:text-green-700 transition-colors`}>
            {title}
          </h3>
          <p className="text-gray-600 text-sm font-spacegroteskregular mb-4 line-clamp-3 flex-grow">
            {excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="inline-flex items-center text-green-600 font-spacegroteskmedium text-sm group-hover:text-green-700 transition-colors">
              Read Article
              <svg className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
