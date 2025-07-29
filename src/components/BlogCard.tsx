import Link from 'next/link';
import Image from 'next/image';
import { Blog } from '@/types';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image 
          src={blog.image} 
          alt={blog.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {blog.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {blog.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {new Date(blog.date).toLocaleDateString()}
          </span>
          <Link 
            href={`/blogs/${blog.slug}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}