import { getBlogs } from '@/lib/data';
import BlogCard from '@/components/BlogCard';

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Latest Reviews & Guides
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with our comprehensive product reviews, buying guides, and tech insights to make informed decisions
          </p>
        </div>

        {/* Ad Banner */}
        <div className="ad-banner mb-8 text-center">
          [Google Ads Banner Space - 728x90]
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>

        {/* Bottom Ad */}
        <div className="ad-banner mt-12 text-center">
          [Google Ads Leaderboard - 728x90]
        </div>
      </div>
    </div>
  );
}