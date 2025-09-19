import { useParams, Link } from 'react-router-dom';
import BlogCard from '../Components/BlogCard';
import { getPostBySlug, getPostById, getSimilarPosts } from '../lib/blog';
import Footer from '../Components/Footer';

const BlogDetail = () => {
  const params = useParams();
  const isId = params.id && !params.slug;
  const post = isId ? getPostById(params.id) : getPostBySlug(params.slug || params.id);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-600">Post not found.</p>
        <Link to="/blogs" className="text-green-700 font-spacegroteskmedium underline">Back to blogs</Link>
      </div>
    );
  }

  const related = getSimilarPosts(post.slug, 3);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* <div className="mb-6">
        <Link to="/blogs" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
          ←
        </Link>
      </div> */}

        <div className="w-full overflow-hidden rounded-3xl border border-gray-200/60 bg-white">
          <img src={post.cover} alt={post.title} className="w-full h-64 sm:h-80 object-cover" />
        </div>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">{post.tag}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-spacegroteskbold text-gray-900 leading-tight">{post.title}</h1>
          <p className="mt-3 text-gray-600">By {post.author}</p>
        </header>

        <article className="prose prose-gray max-w-none mt-8">
          {post.content.split('\n').map((p, idx) => (
            <p key={idx} className="text-gray-800 font-spacegroteskregular leading-relaxed">
              {p}
            </p>
          ))}
        </article>

        <section className="mt-12">
          <h3 className="text-xl font-spacegrotesksemibold text-gray-900 mb-4">Related posts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;
