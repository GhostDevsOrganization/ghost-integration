import React, { useEffect, useState } from 'react';

const BetaDashboard = () => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        loadSubmissions();
    }, []);

    const loadSubmissions = () => {
        const stored = JSON.parse(localStorage.getItem('betaSubmissions') || '[]');
        setSubmissions(stored);
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    const clearSubmissions = () => {
        if (window.confirm('Are you sure you want to clear all beta submissions? This cannot be undone.')) {
            localStorage.removeItem('betaSubmissions');
            loadSubmissions();
        }
    };

    return (
        <div className="p-8 bg-gray-900 text-white min-h-screen">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Beta Submissions Dashboard</h1>
                <p className="text-gray-400">Monitor and manage your GhostDevs beta program signups</p>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-8">
                <div className="bg-teal-500 p-4 rounded">
                    <h2>Total Submissions</h2>
                    <p className="text-2xl">{submissions.length}</p>
                </div>
                <div className="bg-purple-500 p-4 rounded">
                    <h2>Today's Submissions</h2>
                    <p className="text-2xl">
                        {
                            submissions.filter(s => new Date(s.timestamp) >= new Date(new Date().setHours(0, 0, 0, 0)))
                                .length
                        }
                    </p>
                </div>
                <div className="bg-teal-700 p-4 rounded">
                    <h2>This Week</h2>
                    <p className="text-2xl">
                        {
                            submissions.filter(s => new Date(s.timestamp) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
                                .length
                        }
                    </p>
                </div>
            </div>

            <div>
                <h2 className="text-xl mb-4">Recent Submissions</h2>
                {submissions.length === 0 ? (
                    <p className="text-gray-400">No beta submissions yet. Share your beta form to start collecting signups!</p>
                ) : (
                    submissions
                        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                        .map((s, idx) => (
                            <div key={idx} className="border p-4 mb-2 rounded">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="font-bold">{s.name}</p>
                                        <p className="text-sm text-teal-200">{s.email}</p>
                                    </div>
                                    <div>{formatTimestamp(s.timestamp)}</div>
                                </div>
                                <div className="mt-2">
                                    <p>Interests: {Array.isArray(s.interests) ? s.interests.join(', ') : 'None specified'}</p>
                                    <p>Referral Source: {s.referralSource || 'Not specified'}</p>
                                    {s.comments && <p>Comments: {s.comments}</p>}
                                </div>
                            </div>
                        ))
                )}
            </div>

            <div className="mt-4">
                <button onClick={loadSubmissions} className="px-4 py-2 bg-blue-500 rounded mr-2">Refresh</button>
                <button onClick={clearSubmissions} className="px-4 py-2 bg-red-500 rounded">Clear All</button>
            </div>
        </div>
    );
};

export default BetaDashboard;