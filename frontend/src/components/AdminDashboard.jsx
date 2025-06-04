import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [submissions, setSubmissions] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        today: 0,
        thisWeek: 0
    });

    const correctPassword = 'letmein';

    useEffect(() => {
        if (isAuthenticated) {
            loadSubmissions();
            updateStats();
            // Auto-refresh every 30 seconds
            const interval = setInterval(() => {
                loadSubmissions();
                updateStats();
            }, 30000);
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === correctPassword) {
            setIsAuthenticated(true);
        } else {
            alert('Access Denied');
        }
    };

    const loadSubmissions = () => {
        const submissionsData = JSON.parse(localStorage.getItem('beta_submissions') || '[]');
        // Sort by timestamp (newest first)
        submissionsData.sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at));
        setSubmissions(submissionsData);
    };

    const updateStats = () => {
        const submissionsData = JSON.parse(localStorage.getItem('beta_submissions') || '[]');
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        const todaySubmissions = submissionsData.filter(s => new Date(s.submitted_at) >= today).length;
        const weekSubmissions = submissionsData.filter(s => new Date(s.submitted_at) >= weekAgo).length;

        setStats({
            total: submissionsData.length,
            today: todaySubmissions,
            thisWeek: weekSubmissions
        });
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

    const exportSubmissions = () => {
        if (submissions.length === 0) {
            alert('No submissions to export');
            return;
        }

        // Create CSV content
        const headers = ['Name', 'Email', 'Interests', 'Referral Source', 'Comments', 'Timestamp'];
        const csvContent = [
            headers.join(','),
            ...submissions.map(s => [
                `"${s.name}"`,
                `"${s.email}"`,
                `"${s.interests || ''}"`,
                `"${s.referralSource || ''}"`,
                `"${s.comments || ''}"`,
                `"${s.submitted_at}"`
            ].join(','))
        ].join('\n');

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ghostdevs-beta-submissions-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const refreshDashboard = () => {
        loadSubmissions();
        updateStats();
    };

    if (!isAuthenticated) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#0a0a0a',
                color: '#ffffff',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    background: 'rgba(17, 24, 39, 0.95)',
                    border: '1px solid rgba(20, 184, 166, 0.3)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    textAlign: 'center',
                    maxWidth: '400px',
                    width: '100%',
                    margin: '0 1rem'
                }}>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: '900',
                        background: 'linear-gradient(45deg, #ffffff, #00c8ff, #ffffff)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: '1rem'
                    }}>
                        Admin Access
                    </h1>
                    <form onSubmit={handlePasswordSubmit}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin dashboard password"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                marginBottom: '1rem',
                                background: 'rgba(31, 41, 55, 0.5)',
                                border: '1px solid rgba(13, 148, 136, 0.5)',
                                borderRadius: '0.5rem',
                                color: '#ffffff',
                                fontSize: '1rem'
                            }}
                            autoFocus
                        />
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(45deg, #00c8ff, #0080ff)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                fontWeight: '600',
                                cursor: 'pointer',
                                fontSize: '1rem'
                            }}
                        >
                            Access Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            background: '#0a0a0a',
            color: '#ffffff',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace',
            padding: '2rem',
            minHeight: '100vh'
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    background: 'linear-gradient(45deg, #ffffff, #00c8ff, #ffffff)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '1rem'
                }}>
                    Beta Submissions Dashboard
                </h1>
                <p style={{ color: '#888' }}>Monitor and manage your GhostDevs beta program signups</p>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                marginBottom: '3rem'
            }}>
                <div style={{
                    background: 'rgba(0, 200, 255, 0.1)',
                    border: '2px solid #00c8ff',
                    borderRadius: '15px',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '3rem',
                        fontWeight: '900',
                        color: '#00c8ff',
                        marginBottom: '0.5rem'
                    }}>
                        {stats.total}
                    </div>
                    <div style={{ fontSize: '1.1rem', color: '#888' }}>Total Submissions</div>
                </div>
                <div style={{
                    background: 'rgba(0, 200, 255, 0.1)',
                    border: '2px solid #00c8ff',
                    borderRadius: '15px',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '3rem',
                        fontWeight: '900',
                        color: '#00c8ff',
                        marginBottom: '0.5rem'
                    }}>
                        {stats.today}
                    </div>
                    <div style={{ fontSize: '1.1rem', color: '#888' }}>Today's Submissions</div>
                </div>
                <div style={{
                    background: 'rgba(0, 200, 255, 0.1)',
                    border: '2px solid #00c8ff',
                    borderRadius: '15px',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '3rem',
                        fontWeight: '900',
                        color: '#00c8ff',
                        marginBottom: '0.5rem'
                    }}>
                        {stats.thisWeek}
                    </div>
                    <div style={{ fontSize: '1.1rem', color: '#888' }}>This Week</div>
                </div>
            </div>

            {/* Submissions Container */}
            <div style={{
                background: 'rgba(17, 24, 39, 0.95)',
                border: '1px solid rgba(20, 184, 166, 0.3)',
                borderRadius: '1rem',
                padding: '2rem',
                marginBottom: '2rem'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#00c8ff'
                    }}>
                        Recent Submissions
                    </h2>
                    <div>
                        <button
                            onClick={refreshDashboard}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(45deg, #00c8ff, #0080ff)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                fontWeight: '600',
                                cursor: 'pointer',
                                marginRight: '1rem'
                            }}
                        >
                            🔄 Refresh
                        </button>
                        <button
                            onClick={exportSubmissions}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(45deg, #10b981, #a855f7)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            📊 Export CSV
                        </button>
                    </div>
                </div>

                {/* Submissions List */}
                <div>
                    {submissions.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            color: '#9ca3af',
                            fontStyle: 'italic',
                            padding: '3rem'
                        }}>
                            No beta submissions yet. Share your beta form to start collecting signups!
                        </div>
                    ) : (
                        submissions.map((submission, index) => (
                            <div
                                key={submission.id || index}
                                style={{
                                    background: 'rgba(31, 41, 55, 0.5)',
                                    border: '1px solid rgba(13, 148, 136, 0.5)',
                                    borderRadius: '0.5rem',
                                    padding: '1.5rem',
                                    marginBottom: '1rem'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '1rem'
                                }}>
                                    <div>
                                        <div style={{
                                            fontSize: '1.2rem',
                                            fontWeight: '600',
                                            color: '#ffffff'
                                        }}>
                                            {submission.name}
                                        </div>
                                        <div style={{
                                            color: '#99f6e4',
                                            fontSize: '0.9rem'
                                        }}>
                                            {submission.email}
                                        </div>
                                    </div>
                                    <div style={{
                                        color: '#9ca3af',
                                        fontSize: '0.8rem'
                                    }}>
                                        {formatTimestamp(submission.submitted_at)}
                                    </div>
                                </div>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '1rem',
                                    marginTop: '1rem'
                                }}>
                                    <div style={{
                                        background: 'rgba(0, 0, 0, 0.3)',
                                        padding: '1rem',
                                        borderRadius: '8px'
                                    }}>
                                        <div style={{
                                            fontSize: '0.8rem',
                                            color: '#99f6e4',
                                            marginBottom: '0.5rem',
                                            fontWeight: '600'
                                        }}>
                                            Interests
                                        </div>
                                        <div style={{
                                            color: '#d1d5db',
                                            fontSize: '0.9rem'
                                        }}>
                                            {submission.interests && submission.interests.length > 0 ? (
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                    {submission.interests.split(', ').map((interest, i) => (
                                                        <span
                                                            key={i}
                                                            style={{
                                                                background: 'linear-gradient(45deg, #2dd4bf, #a855f7)',
                                                                color: 'white',
                                                                padding: '0.25rem 0.75rem',
                                                                borderRadius: '1rem',
                                                                fontSize: '0.8rem',
                                                                fontWeight: '500'
                                                            }}
                                                        >
                                                            {interest}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                'None specified'
                                            )}
                                        </div>
                                    </div>
                                    <div style={{
                                        background: 'rgba(0, 0, 0, 0.3)',
                                        padding: '1rem',
                                        borderRadius: '8px'
                                    }}>
                                        <div style={{
                                            fontSize: '0.8rem',
                                            color: '#99f6e4',
                                            marginBottom: '0.5rem',
                                            fontWeight: '600'
                                        }}>
                                            Referral Source
                                        </div>
                                        <div style={{
                                            color: '#d1d5db',
                                            fontSize: '0.9rem'
                                        }}>
                                            {submission.referralSource || 'Not specified'}
                                        </div>
                                    </div>
                                </div>
                                {submission.comments && (
                                    <div style={{
                                        background: 'rgba(0, 0, 0, 0.3)',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        marginTop: '1rem'
                                    }}>
                                        <div style={{
                                            fontSize: '0.8rem',
                                            color: '#99f6e4',
                                            marginBottom: '0.5rem',
                                            fontWeight: '600'
                                        }}>
                                            Comments
                                        </div>
                                        <div style={{
                                            color: '#d1d5db',
                                            fontSize: '0.9rem'
                                        }}>
                                            {submission.comments}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Console Tip */}
            <div style={{
                background: 'rgba(255, 193, 7, 0.1)',
                border: '1px solid rgba(255, 193, 7, 0.3)',
                borderRadius: '8px',
                padding: '1rem',
                color: '#ffc107'
            }}>
                <strong style={{ color: '#fff' }}>💡 Pro Tip:</strong> Open your browser's developer console (F12) and type{' '}
                <code>localStorage.getItem('beta_submissions')</code> to see raw submission data.
            </div>
        </div>
    );
};

export default AdminDashboard;
