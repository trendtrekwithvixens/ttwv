import { getBlogBySlug, getBlogs } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Tag } from 'lucide-react';

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blogs" className="hover:text-blue-600">Blogs</Link>
          <span className="mx-2">/</span>
          <span>{blog.title}</span>
        </nav>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-96">
            <Image 
              src={blog.image} 
              alt={blog.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h1 className="text-4xl font-bold mb-4">
                {blog.title}
              </h1>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Tag size={16} />
                  <span>{blog.category}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>

            {/* Ad Spaces throughout content */}
            <div className="ad-banner my-8">
              [Google Ads Rectangle - 336x280]
            </div>
          </div>
        </article>

        {/* Bottom Ad */}
        <div className="ad-banner mt-8">
          [Google Ads Leaderboard - 728x90]
        </div>
      </div>
    </div>
  );
}