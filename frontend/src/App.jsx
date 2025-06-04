import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import QuantumSwapEngineTest from './components/QuantumSwapEngineTest';
import AdminDashboard from './components/AdminDashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuantumSwapEngineTest />,
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
