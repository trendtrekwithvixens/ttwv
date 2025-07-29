import { getProducts } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            All Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection of carefully reviewed products with exclusive deals and honest recommendations
          </p>
        </div>

        {/* Ad Banner */}
        <div className="ad-banner mb-8 text-center">
          [Google Ads Banner Space - 728x90]
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} showDiscount />
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