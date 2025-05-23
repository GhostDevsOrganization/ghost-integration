import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import FuturisticNav from './FuturisticNav';
import EnhancedFooter from './EnhancedFooter';
import { articles } from '../data/articles';
import { Home, Repeat, Link2, BookOpen, ArrowLeft, Clock, User, Calendar, Tag, Share2, ChevronRight, ExternalLink } from 'lucide-react';

const ArticlePage = () => {
    const { articleId } = useParams();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [readingProgress, setReadingProgress] = useState(0);

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

    // Reading progress tracking
    useEffect(() => {
        const handleScroll = () => {
            const article = document.getElementById('article-content');
            if (article) {
                const scrollTop = window.scrollY;
                const docHeight = article.offsetHeight;
                const winHeight = window.innerHeight;
                const scrollPercent = scrollTop / (docHeight - winHeight);
                const scrollPercentRounded = Math.round(scrollPercent * 100);
                setReadingProgress(Math.min(100, Math.max(0, scrollPercentRounded)));
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Find the article from imported data
    const article = articles.find(a => a.id === articleId);
    const relatedArticles = articles.filter(a => a.id !== articleId).slice(0, 3);

    // Define navigation protocols for FuturisticNav
    const protocols = [
        { key: 'home', label: 'Home', path: '/', icon: <Home size={18} /> },
        { key: 'swap', label: 'Token Swapping', path: '/features/token-swapping', icon: <Repeat size={18} /> },
        { key: 'crosschain', label: 'Cross Chain', path: '/features/cross-chain-compatibility', icon: <Link2 size={18} /> },
        { key: 'blog', label: 'Blog', path: '/blog', icon: <BookOpen size={18} /> }
    ];

    if (!article) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-400 mb-4">Article Not Found</h1>
                    <Link to="/blog" className="text-teal-400 hover:text-teal-300 transition-colors duration-300">
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    const formatContent = (content) => {
        return content.split('\n').map((line, index) => {
            // Headers
            if (line.startsWith('# ')) {
                return <h1 key={index} className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-8 mt-12">{line.substring(2)}</h1>;
            }
            if (line.startsWith('## ')) {
                return <h2 key={index} className="text-3xl font-bold text-white mb-6 mt-10">{line.substring(3)}</h2>;
            }
            if (line.startsWith('### ')) {
                return <h3 key={index} className="text-2xl font-bold text-teal-400 mb-4 mt-8">{line.substring(4)}</h3>;
            }
            if (line.startsWith('#### ')) {
                return <h4 key={index} className="text-xl font-bold text-purple-400 mb-3 mt-6">{line.substring(5)}</h4>;
            }

            // Blockquotes
            if (line.startsWith('> ')) {
                return (
                    <blockquote key={index} className="border-l-4 border-teal-400 pl-6 py-4 my-6 bg-gray-800/30 rounded-r-lg">
                        <p className="text-gray-300 italic text-lg">{line.substring(2)}</p>
                    </blockquote>
                );
            }

            // Lists
            if (line.startsWith('- ')) {
                return <li key={index} className="text-gray-300 mb-2 ml-6">{line.substring(2)}</li>;
            }

            // Bold text patterns
            if (line.includes('**') && line.trim() !== '') {
                const parts = line.split('**');
                return (
                    <p key={index} className="text-gray-300 mb-4 leading-relaxed text-lg">
                        {parts.map((part, i) =>
                            i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{part}</strong> : part
                        )}
                    </p>
                );
            }

            // Regular paragraphs
            if (line.trim() !== '') {
                return <p key={index} className="text-gray-300 mb-4 leading-relaxed text-lg">{line}</p>;
            }

            // Empty lines
            return <div key={index} className="mb-2"></div>;
        });
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
            {/* Reading progress bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
                <div
                    className="h-full bg-gradient-to-r from-teal-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${readingProgress}%` }}
                ></div>
            </div>

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
                {[...Array(20)].map((_, i) => (
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

            {/* Breadcrumb */}
            <div className="pt-24 pb-8 relative z-10">
                <div className="max-w-4xl mx-auto px-4">
                    <nav className="flex items-center space-x-2 text-sm text-gray-400">
                        <Link to="/" className="hover:text-teal-400 transition-colors duration-300">Home</Link>
                        <ChevronRight size={16} />
                        <Link to="/blog" className="hover:text-teal-400 transition-colors duration-300">Blog</Link>
                        <ChevronRight size={16} />
                        <span className="text-gray-300">{article.category}</span>
                    </nav>
                </div>
            </div>

            {/* Article Header */}
            <header className="pb-16 relative z-10">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="mb-6">
                        <Link
                            to="/blog"
                            className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors duration-300 mb-8"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Back to Blog
                        </Link>
                    </div>

                    <div className="mb-8">
                        <span className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                            {article.category}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
                            {article.title}
                        </span>
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-400">
                        <div className="flex items-center">
                            <User size={18} className="mr-2" />
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar size={18} className="mr-2" />
                            <span>{article.date}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock size={18} className="mr-2" />
                            <span>{article.readTime} read</span>
                        </div>
                        <button className="flex items-center hover:text-teal-400 transition-colors duration-300">
                            <Share2 size={18} className="mr-2" />
                            <span>Share</span>
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-12">
                        {article.tags.map(tag => (
                            <span key={tag} className="bg-gray-800/50 text-teal-400 px-3 py-1 rounded-full text-sm border border-teal-400/30">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <main className="relative z-10 pb-20">
                <div className="max-w-4xl mx-auto px-4">
                    <article id="article-content" className="prose prose-lg prose-invert max-w-none">
                        <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 md:p-12">
                            {formatContent(article.content)}
                        </div>
                    </article>

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <section className="mt-20">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-8">
                                Related Articles
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedArticles.map(relatedArticle => (
                                    <Link key={relatedArticle.id} to={`/blog/${relatedArticle.id}`} className="block group">
                                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden hover:border-teal-400/50 transition-all duration-500 transform hover:scale-[1.02]">
                                            <div className="aspect-video bg-gradient-to-br from-teal-500/20 to-purple-500/20 flex items-center justify-center">
                                                <BookOpen size={32} className="text-teal-400/50" />
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="bg-gray-800/50 text-teal-400 px-2 py-1 rounded text-sm">
                                                        {relatedArticle.category}
                                                    </span>
                                                    <div className="flex items-center text-gray-400 text-sm">
                                                        <Clock size={14} className="mr-1" />
                                                        {relatedArticle.readTime}
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-teal-300 transition-colors duration-300 line-clamp-2">
                                                    {relatedArticle.title}
                                                </h3>
                                                <p className="text-gray-300 text-sm line-clamp-3">
                                                    {relatedArticle.excerpt}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Call to Action */}
                    <section className="mt-20 text-center">
                        <div className="bg-gradient-to-r from-teal-500/10 to-purple-500/10 border border-teal-400/30 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4">
                                Explore More Kaspa Insights
                            </h3>
                            <p className="text-gray-300 mb-6">
                                Discover more articles about Kaspa's revolutionary technology and ecosystem.
                            </p>
                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full font-medium text-white hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105"
                            >
                                View All Articles
                                <ExternalLink size={18} />
                            </Link>
                        </div>
                    </section>
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

export default ArticlePage;
