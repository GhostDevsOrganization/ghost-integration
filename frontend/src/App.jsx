import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import QuantumSwapEngineTest from './components/QuantumSwapEngineTest';
import AdminDashboard from './components/AdminDashboard';
import InterdimensionalPortal from './components/InterdimensionalPortal';
import BridgeProtocol from './components/BridgeProtocol';
import TokenSwappingPage from './components/TokenSwappingPage';
import VaultsProtocol from './components/VaultsProtocol';
import LendingProtocol from './components/LendingProtocol';
import OracleProtocol from './components/OracleProtocol';
import MultiSigProtocol from './components/MultiSigProtocol';
import TechnicalArchitectureDashboard from './components/TechnicalArchitectureDashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <InterdimensionalPortal />,
  },
  {
    path: "/portal",
    element: <InterdimensionalPortal />,
  },
  {
    path: "/test/quantum-swap",
    element: <QuantumSwapEngineTest />,
  },
  {
    path: "/bridge",
    element: <BridgeProtocol />,
  },
  {
    path: "/swap",
    element: <TokenSwappingPage />,
  },
  {
    path: "/vaults",
    element: <VaultsProtocol />,
  },
  {
    path: "/lending",
    element: <LendingProtocol />,
  },
  {
    path: "/oracle",
    element: <OracleProtocol />,
  },
  {
    path: "/multisig",
    element: <MultiSigProtocol />,
  },
  {
    path: "/architecture",
    element: <TechnicalArchitectureDashboard />,
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
