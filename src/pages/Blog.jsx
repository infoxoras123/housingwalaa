import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import B1 from "../assets/blog/B1.png";
import blogPosts from "../data/blogPosts";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Number of posts per page
  const navigate = useNavigate();

  const categoryColors = {
    "Home Buying": "bg-green-100 text-green-800",
    Investing: "bg-yellow-100 text-yellow-800",
    Financing: "bg-blue-100 text-blue-800",
    "Interior Design": "bg-pink-100 text-pink-800",
    "Location Guides": "bg-purple-100 text-purple-800",
    "Legal Advice": "bg-red-100 text-red-800",
  };

  const categories = [
    "All",
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const featuredPosts = blogPosts.filter((post) => post.featured);

  const handleReadMore = (post) => {
    const postUrl = `/blog/${post.id}/${post.slug}`;
    console.log('Navigating to:', postUrl); // Debug log
    navigate(postUrl);
  };

  // Debug log to check blog posts
  useEffect(() => {
    console.log("Available blog posts:", blogPosts);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          HousingWalaa Blog | Real Estate Tips, Market Insights & Buying Guides
        </title>
        <meta
          name="description"
          content="Get expert real estate advice, market trends, and property buying guides from HousingWalaa - India's most trusted property platform."
        />
        <meta
          property="og:image"
          content="/images/blog/housingwalaa-blog-social.jpg"
        />
      </Helmet>

      {/* Hero Section with Gradient Background */}
      <div className="relative bg-gradient-to-br from-blue-900 to-cyan-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/blog/pattern.svg')] bg-repeat"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              HousingWalaa <span className="text-cyan-300">Insights</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
              Expert real estate advice, market trends, and actionable buying
              guides
            </p>

            {/* Search Bar with Glass Morphism Effect */}
            <div className="max-w-2xl mx-auto">
              <div className="relative backdrop-blur-sm bg-white/10 rounded-xl p-1 shadow-lg">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                  className="w-full px-5 py-4 bg-white/90 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-cyan-600 text-white p-2 rounded-lg hover:bg-cyan-700 transition-colors">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Filters */}
          <div className="mb-12 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setCurrentPage(1); // Reset to first page when changing category
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Posts (Desktop only) */}

          {/* All Articles */}
          <div className="flex flex-col lg:flex-row gap-8">
            <main className="lg:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Latest Articles
              </h2>

              {currentPosts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    No articles found
                  </h3>
                  <p className="mt-1 text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {currentPosts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={post.image}
                          alt={post.alt}
                          className="w-full h-full"
                          loading="lazy"
                        />
                        <span
                          className={`absolute top-4 left-4 text-xs px-2 py-1 rounded-full ${
                            categoryColors[post.category] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {post.category}
                        </span>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                          <Link to={`/blog/${post.id}/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <Link
                          to={`/blog/${post.id}/${post.slug}`}
                          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 group"
                        >
                          Read more
                          <svg
                            className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {filteredPosts.length > postsPerPage && (
                <div className="mt-12 flex justify-center">
                  <nav className="inline-flex rounded-md shadow-sm">
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                            currentPage === number
                              ? "bg-blue-50 border-blue-500 text-blue-600"
                              : "bg-white text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {number}
                        </button>
                      )
                    )}
                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </main>

            {/* Sidebar */}
            <aside className="lg:w-1/3 space-y-8">
              {/* About Card */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <svg
                      className="h-8 w-8 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    About HousingWalaa
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We're India's fastest growing real estate platform, helping
                  thousands find their perfect home every month with
                  transparent, tech-enabled services.
                </p>
                <a
                  href="/about"
                  className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center"
                >
                  Learn more about us
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>

              {/* Categories Card */}
              {/* <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        Categories
      </h3>
      <ul className="space-y-3">
        {categories.filter(cat => cat !== 'All').map((category, index) => (
          <li key={index}>
            <a
              href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 group"
            >
              <span className="text-gray-700 group-hover:text-blue-600">{category}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[category] || 'bg-gray-100 text-gray-800'}`}>
                {blogPosts.filter(post => post.category === category).length}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div> */}
            </aside>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Find Your Dream Home?
                </h2>
                <p className="text-xl text-blue-100 max-w-2xl">
                  Our expert agents are standing by to help you navigate the
                  property market with confidence
                </p>
              </div>
              <div className="md:w-1/3 flex flex-col space-y-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md text-blue-600 bg-white hover:bg-gray-100 font-medium text-center"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Contact an Agent
                </a>
                <a
                  href="/listings"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md text-white bg-blue-800 hover:bg-blue-900 font-medium text-center"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Browse Listings
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
