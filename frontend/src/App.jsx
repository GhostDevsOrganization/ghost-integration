import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InterdimensionalPortal from './components/InterdimensionalPortal';
import BetaDashboard from './components/BetaDashboard';

function App() {
    // Example state to control BetaTestForm visibility within your portal page
    const [showBetaForm, setShowBetaForm] = useState(false);

    return (
        <Router>
            <nav className="p-4 bg-gray-800 text-white">
                <Link to="/" className="mr-4">Portal</Link>
                <Link to="/dashboard">Beta Dashboard</Link>
            </nav>
            <Routes>
                <Route
                    path="/"
                    element={
                        <InterdimensionalPortal
                            showBetaForm={showBetaForm}
                            setShowBetaForm={setShowBetaForm}
                        />
                    }
                />
                <Route path="/dashboard" element={<BetaDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;