import { getProductBySlug, getProducts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Tag, ExternalLink } from 'lucide-react';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <span className="mx-2">/</span>
          <span>{product.title}</span>
        </nav>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden p-8">
          {/* Product Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Product Image on Left */}
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Details on Right */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center space-x-4 text-gray-700 mb-6">
                <div className="flex items-center space-x-1">
                  <Tag size={18} />
                  <span>{product.category}</span>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-lg">
                    {product.originalPrice}
                  </span>
                )}
                {product.discount && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.discount}
                  </div>
                )}
              </div>

              {/* Initial Buying Links (if any) */}
              {product.buyingLinks && product.buyingLinks.length > 0 && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="text-xl font-semibold mb-4 text-green-800">
                    Quick Buy Options:
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {product.buyingLinks.slice(0, 2).map((link, index) => ( // Show first 2 for quick buy
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-green-500 hover:shadow-md transition-all"
                      >
                        <div>
                          <div className="font-semibold text-gray-800">
                            {link.platform}
                          </div>
                          <div className="text-green-600 font-bold">
                            {link.price}
                          </div>
                        </div>
                        <ExternalLink size={18} className="text-gray-400" />
                      </a>
                    ))}
                    {product.buyingLinks.length > 2 && (
                      <a href="#buying-links" className="text-center text-green-700 hover:underline mt-2">
                        View all buying options &darr;
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Details</h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: product.content }} />
            </div>
          </div>

          {/* Ad Space */}
          <div className="ad-banner my-8 text-center bg-gray-100 p-4 rounded-lg">
            [Google Ads Rectangle - 336x280]
          </div>

          {/* Buying Links Section - Repeated at Bottom */}
          {product.buyingLinks && product.buyingLinks.length > 0 && (
            <div id="buying-links" className="mt-12 p-6 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-2xl font-bold mb-6 text-green-800">
                🛒 Where to Buy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.buyingLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white rounded-lg border hover:border-green-500 hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="font-semibold text-gray-800">
                        {link.platform}
                      </div>
                      <div className="text-green-600 font-bold">
                        {link.price}
                      </div>
                    </div>
                    <ExternalLink size={20} className="text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Bottom Ad */}
        <div className="ad-banner mt-8 text-center bg-gray-100 p-4 rounded-lg">
          [Google Ads Leaderboard - 728x90]
        </div>
      </div>
    </div>
  );
}