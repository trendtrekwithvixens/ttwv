import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Product, Blog } from '@/types';

const contentDirectory = path.join(process.cwd(), 'content');

export async function getProducts(): Promise<Product[]> {
  const productsDirectory = path.join(contentDirectory, 'products');
  const filenames = fs.readdirSync(productsDirectory);
  
  const products = await Promise.all(
    filenames
      .filter(name => name.endsWith('.md'))
      .map(async (name) => {
        const fullPath = path.join(productsDirectory, name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const processedContent = await remark().use(html).process(content);
        
        return {
          slug: name.replace(/\.md$/, ''),
          title: data.title,
          description: data.description,
          price: data.price || '',
          originalPrice: data.originalPrice,
          discount: data.discount,
          image: data.image,
          category: data.category,
          featured: data.featured || false,
          content: processedContent.toString(),
          buyingLinks: data.buyingLinks || [],
        } as Product;
      })
  );
  
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const fullPath = path.join(contentDirectory, 'products', `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    
    return {
      slug,
      title: data.title,
      description: data.description,
      price: data.price || '',
      originalPrice: data.originalPrice,
      discount: data.discount,
      image: data.image,
      category: data.category,
      featured: data.featured || false,
      content: processedContent.toString(),
      buyingLinks: data.buyingLinks || [],
    } as Product;
  } catch {
    return null;
  }
}

export async function getBlogs(): Promise<Blog[]> {
  const blogsDirectory = path.join(contentDirectory, 'blogs');
  const filenames = fs.readdirSync(blogsDirectory);
  
  const blogs = await Promise.all(
    filenames
      .filter(name => name.endsWith('.md'))
      .map(async (name) => {
        const fullPath = path.join(blogsDirectory, name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const processedContent = await remark().use(html).process(content);
        
        return {
          slug: name.replace(/\.md$/, ''),
          title: data.title,
          description: data.description,
          date: data.date,
          image: data.image,
          category: data.category,
          content: processedContent.toString(),
        } as Blog;
      })
  );
  
  return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const fullPath = path.join(contentDirectory, 'blogs', `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    
    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      image: data.image,
      category: data.category,
      content: processedContent.toString(),
    } as Blog;
  } catch {
    return null;
  }
}