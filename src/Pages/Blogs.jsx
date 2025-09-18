import { useMemo, useState } from 'react';
import BlogCard from '../Components/BlogCard';
import { getAllPosts } from '../lib/blog';

const BlogList = () => {
  const allPosts = getAllPosts();
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const tags = useMemo(() => ['All', ...Array.from(new Set(allPosts.map(p => p.tag).filter(Boolean)))], [allPosts]);

  const filtered = useMemo(() => {
    let res = allPosts;
    if (activeTag !== 'All') res = res.filter(p => p.tag === activeTag);
    if (query.trim()) {
      const q = query.toLowerCase();
      res = res.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q)
      );
    }
    return res;
  }, [allPosts, query, activeTag]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
        <div className="relative flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-spacegroteskregular"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">⌕</span>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap border transition-all ${activeTag === t
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post, i) => (
          <BlogCard key={post.slug} post={post} variant={i < 1 ? 'featured' : 'default'} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
