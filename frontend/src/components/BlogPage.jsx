import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FuturisticNav from './FuturisticNav';
import EnhancedFooter from './EnhancedFooter';
import { articles, categories, hotTopics } from '../data/articles';
import { Home, Repeat, Wallet, Link2, BookOpen, Search, Clock, User, Tag, TrendingUp, Star, Calendar } from 'lucide-react';

const BlogPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Mouse movement tracking for background effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) - 0.5,
                y: (e.clientY / window.innerHeight) - 0.5
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Create categories with counts based on imported articles
    const categoriesWithCounts = categories.map(category => ({
        ...category,
        count: category.id === 'all' ? articles.length :
            articles.filter(a => a.category.toLowerCase() === category.id).length
    }));

    const recentArticles = articles.slice(0, 5);
    const pinnedArticles = articles.filter(a => a.featured);

    // Filter articles based on search and category
    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || article.category.toLowerCase() === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredArticle = articles.find(a => a.featured);
    const regularArticles = filteredArticles.filter(a => !a.featured);

    // Define navigation protocols for FuturisticNav
    const protocols = [
        { key: 'home', label: 'Home', path: '/', icon: <Home size={18} /> },
        { key: 'swap', label: 'Token Swapping', path: '/features/token-swapping', icon: <Repeat size={18} /> },
        { key: 'crosschain', label: 'Cross Chain', path: '/features/cross-chain-compatibility', icon: <Link2 size={18} /> },
        { key: 'blog', label: 'Blog', path: '/blog', icon: <BookOpen size={18} /> }
    ];

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
            {/* Animated background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 via-purple-900/10 to-blue-900/10"></div>
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.1),transparent_70%)]"
                    style={{
                        transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`
                    }}
                ></div>

                {/* Floating particles */}
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-teal-400/30 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    />
                ))}
            </div>

            <FuturisticNav
                protocols={protocols}
                activeProtocol="blog"
            />

            {/* Header */}
            <header className="pt-24 pb-16 text-center relative z-10">
                <div className="flex justify-center items-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-teal-400/30">
                        <BookOpen size={40} className="text-teal-400" />
                    </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">Kaspa Knowledge Hub</span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-500 mx-auto mb-8"></div>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto px-4">
                    Deep insights into Kaspa's revolutionary technology, ecosystem developments, and the future of blockchain innovation.
                </p>
            </header>

            {/* Main content */}
            <main className="max-w-7xl mx-auto px-4 pb-20 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="space-y-6 sticky top-24">
                            {/* Search */}
                            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-teal-400/50 transition-all duration-500">
                                <h3 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4">Search</h3>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-teal-400/50 focus:outline-none transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-teal-400/50 transition-all duration-500">
                                <h3 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {categoriesWithCounts.map(category => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${selectedCategory === category.id
                                                ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white'
                                                : 'text-gray-300 hover:bg-teal-500/10 hover:text-teal-300'
                                                }`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span>{category.label}</span>
                                                <span className="text-sm opacity-70">({category.count})</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Hot Topics */}
                            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-teal-400/50 transition-all duration-500">
                                <h3 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4 flex items-center">
                                    <TrendingUp size={20} className="mr-2" />
                                    Hot Topics
                                </h3>
                                <div className="space-y-2">
                                    {hotTopics.map((topic, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSearchTerm(topic)}
                                            className="block w-full text-left px-3 py-2 text-gray-300 hover:bg-teal-500/10 hover:text-teal-300 rounded-lg transition-all duration-300"
                                        >
                                            #{topic}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Articles */}
                            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-teal-400/50 transition-all duration-500">
                                <h3 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4 flex items-center">
                                    <Clock size={20} className="mr-2" />
                                    Recent
                                </h3>
                                <div className="space-y-3">
                                    {recentArticles.map(article => (
                                        <Link
                                            key={article.id}
                                            to={`/blog/${article.id}`}
                                            className="block group"
                                        >
                                            <h4 className="text-sm font-medium text-gray-300 group-hover:text-teal-300 transition-colors duration-300 line-clamp-2">
                                                {article.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-1">{article.date}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Pinned Articles */}
                            {pinnedArticles.length > 0 && (
                                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-teal-400/50 transition-all duration-500">
                                    <h3 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4 flex items-center">
                                        <Star size={20} className="mr-2" />
                                        Pinned
                                    </h3>
                                    <div className="space-y-3">
                                        {pinnedArticles.map(article => (
                                            <Link
                                                key={article.id}
                                                to={`/blog/${article.id}`}
                                                className="block group"
                                            >
                                                <h4 className="text-sm font-medium text-gray-300 group-hover:text-teal-300 transition-colors duration-300 line-clamp-2">
                                                    {article.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1">{article.readTime} read</p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main content area */}
                    <div className="lg:w-3/4">
                        {/* Featured Article */}
                        {featuredArticle && selectedCategory === 'all' && !searchTerm && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-6 flex items-center">
                                    <Star size={24} className="mr-2 text-teal-400" />
                                    Featured Article
                                </h2>
                                <Link to={`/blog/${featuredArticle.id}`} className="block group">
                                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden hover:border-teal-400/50 transition-all duration-500 transform hover:scale-[1.02]">
                                        <div className="aspect-video bg-gradient-to-br from-teal-500/20 to-purple-500/20 flex items-center justify-center">
                                            <BookOpen size={64} className="text-teal-400/50" />
                                        </div>
                                        <div className="p-8">
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                    {featuredArticle.category}
                                                </span>
                                                <div className="flex items-center text-gray-400 text-sm">
                                                    <Calendar size={16} className="mr-1" />
                                                    {featuredArticle.date}
                                                </div>
                                                <div className="flex items-center text-gray-400 text-sm">
                                                    <Clock size={16} className="mr-1" />
                                                    {featuredArticle.readTime}
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-300 transition-colors duration-300">
                                                {featuredArticle.title}
                                            </h3>
                                            <p className="text-gray-300 mb-4 line-clamp-3">
                                                {featuredArticle.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center text-gray-400 text-sm">
                                                    <User size={16} className="mr-1" />
                                                    {featuredArticle.author}
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {featuredArticle.tags.slice(0, 3).map(tag => (
                                                        <span key={tag} className="bg-gray-800/50 text-gray-300 px-2 py-1 rounded text-xs">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}

                        {/* Articles Grid */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
                                    {searchTerm ? `Search Results for "${searchTerm}"` :
                                        selectedCategory === 'all' ? 'Latest Articles' :
                                            `${categories.find(c => c.id === selectedCategory)?.label} Articles`}
                                </h2>
                                <span className="text-gray-400 text-sm">
                                    {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {regularArticles.map(article => (
                                    <Link key={article.id} to={`/blog/${article.id}`} className="block group">
                                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden hover:border-teal-400/50 transition-all duration-500 transform hover:scale-[1.02] h-full">
                                            <div className="aspect-video bg-gradient-to-br from-teal-500/20 to-purple-500/20 flex items-center justify-center">
                                                <BookOpen size={48} className="text-teal-400/50" />
                                            </div>
                                            <div className="p-6 flex flex-col h-full">
                                                <div className="flex items-center gap-4 mb-3">
                                                    <span className="bg-gray-800/50 text-teal-400 px-3 py-1 rounded-full text-sm">
                                                        {article.category}
                                                    </span>
                                                    <div className="flex items-center text-gray-400 text-sm">
                                                        <Clock size={14} className="mr-1" />
                                                        {article.readTime}
                                                    </div>
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors duration-300 line-clamp-2">
                                                    {article.title}
                                                </h3>
                                                <p className="text-gray-300 mb-4 line-clamp-3 flex-grow">
                                                    {article.excerpt}
                                                </p>
                                                <div className="flex items-center justify-between mt-auto">
                                                    <div className="flex items-center text-gray-400 text-sm">
                                                        <User size={14} className="mr-1" />
                                                        {article.author}
                                                    </div>
                                                    <div className="text-gray-400 text-sm">
                                                        {article.date}
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {article.tags.slice(0, 3).map(tag => (
                                                        <span key={tag} className="bg-gray-800/50 text-gray-300 px-2 py-1 rounded text-xs">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {filteredArticles.length === 0 && (
                                <div className="text-center py-20">
                                    <BookOpen size={64} className="text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-gray-400 mb-2">No articles found</h3>
                                    <p className="text-gray-500">Try adjusting your search or category filter.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <EnhancedFooter />

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                
                .animate-float { animation: float 6s ease-in-out infinite; }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default BlogPage;
