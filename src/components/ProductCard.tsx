import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  showDiscount?: boolean;
}

export default function ProductCard({ product, showDiscount = false }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image 
          src={product.image} 
          alt={product.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
        {showDiscount && product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
            {product.discount}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-green-600">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                {product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        <div className="flex space-x-2">
          <Link 
            href={`/products/${product.slug}#buying-links`}
            className="flex-1 bg-green-600 text-white text-center py-2 rounded-md hover:bg-green-700 transition-colors font-medium"
          >
            Buy Now
          </Link>
          <Link 
            href={`/products/${product.slug}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}