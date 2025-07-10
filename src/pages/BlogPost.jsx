import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import blogPosts from "../data/blogPosts";

const categoryColors = {
  "Home Buying": "bg-green-100 text-green-800",
  Investing: "bg-yellow-100 text-yellow-800",
  Financing: "bg-blue-100 text-blue-800",
  "Interior Design": "bg-pink-100 text-pink-800",
  "Location Guides": "bg-purple-100 text-purple-800",
  "Legal Advice": "bg-red-100 text-red-800",
};

const BlogPost = () => {
  const { id, slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const foundPost = blogPosts.find((p) => p.id === parseInt(id));
    
    if (!foundPost) {
      console.log('Post not found:', { id, slug });
      navigate('/blog');
      return;
    }

    if (foundPost.slug !== slug) {
      console.log('Slug mismatch:', { expected: foundPost.slug, received: slug });
      navigate('/blog');
      return;
    }

    setPost(foundPost);
    setLoading(false);
  }, [id, slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <h2 className="text-2xl font-bold mt-4 text-gray-800">Loading...</h2>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Post not found</h2>
        <p className="mb-4 text-gray-500">The article you are looking for does not exist.</p>
        <Link to="/blog" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-black/50 z-10"></div>
        <img
          src={post.coverimage}
          alt={post.alt}
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          <div className="max-w-4xl mx-auto">
            <span
              className={`inline-block text-xs px-3 py-1 rounded-full mb-4 backdrop-blur-sm ${
                categoryColors[post.category] || "bg-gray-100 text-gray-800"
              }`}
            >
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-xl">
              {post.title}
            </h1>
            <div className="flex items-center text-white text-sm drop-shadow-lg">
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <div 
              className="prose prose-lg max-w-none text-gray-800 prose-headings:mt-6 prose-headings:mb-3 prose-p:my-3"
              dangerouslySetInnerHTML={{ 
                __html: post.content
                  .split('\n')
                  .map(paragraph => {
                    // Handle headings
                    if (paragraph.startsWith('Understanding') || 
                        paragraph.startsWith('Key Factors') || 
                        paragraph.startsWith('How Much') || 
                        paragraph.startsWith('How Much Should') || 
                        paragraph.startsWith('Home Purchase') || 
                        paragraph.startsWith('Rent vs EMI') || 
                        paragraph.startsWith('Rapid Salary') || 
                        paragraph.startsWith('FAQs') || 
                        paragraph.startsWith('Ready to Start')) {
                      return `<h2 class="text-2xl font-bold text-gray-900 mt-6 mb-3 pb-2 border-b border-gray-200">${paragraph}</h2>`;
                    }
                    // Handle bullet points
                    if (paragraph.startsWith('•')) {
                      return `<div class="flex items-start mb-2 bg-gray-50 p-3 rounded-lg">
                        <span class="text-blue-600 mr-3 mt-1">•</span>
                        <p class="m-0 text-gray-700 leading-relaxed">${paragraph.substring(1).trim()}</p>
                      </div>`;
                    }
                    // Handle numbered lists
                    if (paragraph.match(/^\d+\./)) {
                      return `<div class="flex items-start mb-2 bg-gray-50 p-3 rounded-lg">
                        <span class="text-blue-600 mr-3 mt-1 font-medium">${paragraph.match(/^\d+/)[0]}.</span>
                        <p class="m-0 text-gray-700 leading-relaxed">${paragraph.substring(paragraph.indexOf('.') + 1).trim()}</p>
                      </div>`;
                    }
                    // Handle city data
                    if (paragraph.includes(' - ')) {
                      const [city, details] = paragraph.split(' - ');
                      return `<div class="flex flex-col md:flex-row mb-2 bg-blue-50 p-3 rounded-lg">
                        <span class="font-semibold text-blue-900 mb-1 md:mb-0 md:mr-4">${city}</span>
                        <span class="text-gray-700 leading-relaxed">${details}</span>
                      </div>`;
                    }
                    // Handle empty lines
                    if (paragraph.trim() === '') {
                      return '<br>';
                    }
                    // Handle regular paragraphs
                    return `<p class="my-3 text-gray-700 leading-relaxed">${paragraph}</p>`;
                  })
                  .join('')
              }}
            />
          </div>
        </div>

        {/* Back to Blog Button */}
        <div className="mt-8 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center px-8 py-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition group shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
