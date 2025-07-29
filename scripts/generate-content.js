// Import statements updated to modern ESM syntax
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');
const outputDirectory = path.join(process.cwd(), 'src', 'data');

// Ensure output directory exists
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

async function generateProducts() {
  console.log('Generating products...');
  
  const productsDirectory = path.join(contentDirectory, 'products');
  
  if (!fs.existsSync(productsDirectory)) {
    console.log('Products directory not found, creating empty products array');
    fs.writeFileSync(
      path.join(outputDirectory, 'products.json'),
      JSON.stringify([], null, 2)
    );
    return;
  }

  const filenames = fs.readdirSync(productsDirectory);
  
  const products = await Promise.all(
    filenames
      .filter(name => name.endsWith('.md'))
      .map(async (name) => {
        const fullPath = path.join(productsDirectory, name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        // This line now works correctly with the new packages
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
        };
      })
  );
  
  fs.writeFileSync(
    path.join(outputDirectory, 'products.json'),
    JSON.stringify(products, null, 2)
  );
  
  console.log(`Generated ${products.length} products`);
}

async function generateBlogs() {
  console.log('Generating blogs...');
  
  const blogsDirectory = path.join(contentDirectory, 'blogs');
  
  if (!fs.existsSync(blogsDirectory)) {
    console.log('Blogs directory not found, creating empty blogs array');
    fs.writeFileSync(
      path.join(outputDirectory, 'blogs.json'),
      JSON.stringify([], null, 2)
    );
    return;
  }

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
        };
      })
  );
  
  // Sort by date (newest first)
  const sortedBlogs = blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  fs.writeFileSync(
    path.join(outputDirectory, 'blogs.json'),
    JSON.stringify(sortedBlogs, null, 2)
  );
  
  console.log(`Generated ${blogs.length} blogs`);
}

async function main() {
  try {
    console.log('Starting static content generation...');
    
    await generateProducts();
    await generateBlogs();
    
    console.log('✅ Static content generation completed!');
  } catch (error) {
    console.error('❌ Error generating static content:', error);
    process.exit(1);
  }
}

main();