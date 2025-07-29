import { Product, Blog } from '@/types';

// Import the statically generated JSON files
import productsData from '@/data/products.json';
import blogsData from '@/data/blogs.json';

export async function getProducts(): Promise<Product[]> {
  return productsData as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = productsData as Product[];
  const product = products.find(p => p.slug === slug);
  return product || null;
}

export async function getBlogs(): Promise<Blog[]> {
  return blogsData as Blog[];
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const blogs = blogsData as Blog[];
  const blog = blogs.find(b => b.slug === slug);
  return blog || null;
}

// Additional helper functions you might need
export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(p => p.featured);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

export async function getBlogsByCategory(category: string): Promise<Blog[]> {
  const blogs = await getBlogs();
  return blogs.filter(b => b.category.toLowerCase() === category.toLowerCase());
}