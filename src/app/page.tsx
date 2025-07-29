import { getProducts, getBlogs } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import BlogCard from '@/components/BlogCard';

export default async function HomePage() {
  const products = await getProducts();
  const blogs = await getBlogs();
  
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);
  const topSellingProducts = products.slice(0, 8);
  const recentBlogs = blogs.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Best Deals & Product Reviews
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover amazing products with exclusive discounts and honest reviews
          </p>
          <div className="ad-banner text-black">
            [Google Ads Banner Space - 728x90]
          </div>
        </div>
      </section>

      {/* Featured Discounts */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-red-700">
            🔥 Hot Discounts & Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} showDiscount />
            ))}
          </div>
        </div>
      </section>

      {/* Ad Space */}
      <div className="container mx-auto px-4">
        <div className="ad-banner">
          [Google Ads Rectangle - 336x280]
        </div>
      </div>

      {/* Top Selling Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Top Selling Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topSellingProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Latest Reviews & Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentBlogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="container mx-auto px-4">
        <div className="ad-banner">
          [Google Ads Leaderboard - 728x90]
        </div>
      </div>
    </div>
  );
}