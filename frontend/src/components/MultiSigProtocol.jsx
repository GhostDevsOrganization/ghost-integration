import React, { useState, useEffect } from 'react';
import {
    Users, Home, Wallet, Shield, Plus, Minus, CheckCircle,
    Clock, AlertCircle, Key, Lock, Unlock, Settings,
    BarChart3, Activity, UserPlus, FileText, Eye
} from 'lucide-react';

const MultiSigProtocol = () => {
    // MultiSig state
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [action, setAction] = useState('create'); // create, propose, sign
    const [transactionStatus, setTransactionStatus] = useState('idle');

    // Real-time multisig data
    const [multisigData, setMultisigData] = useState({
        totalWallets: 42,
        totalSecured: '$15.3M',
        activeSigners: 156,
        pendingTransactions: 8,
        completedTransactions: '2,847',
        averageSignTime: '2.4h'
    });

    // MultiSig wallets
    const [wallets, setWallets] = useState([
        {
            id: 1,
            name: 'Treasury Wallet',
            address: 'kaspa:qp2...8x9z',
            balance: '125,000 KAS',
            threshold: '3/5',
            signers: 5,
            required: 3,
            status: 'active',
            pendingTxs: 2,
            yourRole: 'signer'
        },
        {
            id: 2,
            name: 'Team Operations',
            address: 'kaspa:qr5...2m4n',
            balance: '45,300 KAS',
            threshold: '2/3',
            signers: 3,
            required: 2,
            status: 'active',
            pendingTxs: 1,
            yourRole: 'owner'
        },
        {
            id: 3,
            name: 'Emergency Fund',
            address: 'kaspa:qs8...7k1p',
            balance: '200,000 KAS',
            threshold: '4/7',
            signers: 7,
            required: 4,
            status: 'active',
            pendingTxs: 0,
            yourRole: 'signer'
        }
    ]);

    // Pending transactions
    const [pendingTransactions, setPendingTransactions] = useState([
        {
            id: 1,
            walletId: 1,
            walletName: 'Treasury Wallet',
            type: 'Transfer',
            to: 'kaspa:qt9...5w2x',
            amount: '10,000 KAS',
            description: 'Marketing budget allocation',
            signatures: 2,
            required: 3,
            status: 'pending',
            timeRemaining: '22h',
            initiator: 'alice.eth',
            signers: ['alice.eth', 'bob.eth'],
            missingSigns: ['charlie.eth']
        },
        {
            id: 2,
            walletId: 1,
            walletName: 'Treasury Wallet',
            type: 'Parameter Change',
            description: 'Increase signing threshold to 4/5',
            signatures: 1,
            required: 3,
            status: 'pending',
            timeRemaining: '45h',
            initiator: 'bob.eth',
            signers: ['bob.eth'],
            missingSigns: ['alice.eth', 'charlie.eth']
        },
        {
            id: 3,
            walletId: 2,
            walletName: 'Team Operations',
            type: 'Transfer',
            to: 'kaspa:qu3...8m7q',
            amount: '5,000 KAS',
            description: 'Development milestone payment',
            signatures: 1,
            required: 2,
            status: 'pending',
            timeRemaining: '12h',
            initiator: 'dave.eth',
            signers: ['dave.eth'],
            missingSigns: ['eve.eth']
        }
    ]);

    // Form states
    const [createForm, setCreateForm] = useState({
        name: '',
        signers: ['', '', ''],
        threshold: 2,
        timelock: '24'
    });

    const [proposeForm, setProposeForm] = useState({
        type: 'transfer',
        recipient: '',
        amount: '',
        description: ''
    });

    // Update multisig data every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setMultisigData(prev => ({
                totalWallets: Math.floor(40 + Math.random() * 10),
                totalSecured: `$${(15.3 + Math.random() * 2).toFixed(1)}M`,
                activeSigners: Math.floor(150 + Math.random() * 20),
                pendingTransactions: Math.floor(6 + Math.random() * 6),
                completedTransactions: `${Math.floor(2840 + Math.random() * 20)}`,
                averageSignTime: `${(2.4 + Math.random() * 1).toFixed(1)}h`
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Handle multisig actions
    const handleMultisigAction = async () => {
        setTransactionStatus('processing');

        setTimeout(() => {
            setTransactionStatus('success');

            if (action === 'create') {
                // Add new wallet
                const newWallet = {
                    id: wallets.length + 1,
                    name: createForm.name,
                    address: `kaspa:q${Math.random().toString(36).substr(2, 6)}...${Math.random().toString(36).substr(2, 4)}`,
                    balance: '0 KAS',
                    threshold: `${createForm.threshold}/${createForm.signers.filter(s => s).length}`,
                    signers: createForm.signers.filter(s => s).length,
                    required: createForm.threshold,
                    status: 'active',
                    pendingTxs: 0,
                    yourRole: 'owner'
                };
                setWallets(prev => [...prev, newWallet]);
                setCreateForm({ name: '', signers: ['', '', ''], threshold: 2, timelock: '24' });
            } else if (action === 'propose') {
                // Add new pending transaction
                const newTx = {
                    id: pendingTransactions.length + 1,
                    walletId: selectedWallet.id,
                    walletName: selectedWallet.name,
                    type: proposeForm.type === 'transfer' ? 'Transfer' : 'Parameter Change',
                    to: proposeForm.recipient,
                    amount: proposeForm.amount ? `${proposeForm.amount} KAS` : undefined,
                    description: proposeForm.description,
                    signatures: 1,
                    required: selectedWallet.required,
                    status: 'pending',
                    timeRemaining: '48h',
                    initiator: 'you',
                    signers: ['you'],
                    missingSigns: ['signer1', 'signer2']
                };
                setPendingTransactions(prev => [...prev, newTx]);
                setProposeForm({ type: 'transfer', recipient: '', amount: '', description: '' });
            }

            setTimeout(() => setTransactionStatus('idle'), 3000);
        }, 2500);
    };

    // Handle signing transaction
    const handleSign = (txId) => {
        setPendingTransactions(prev => prev.map(tx =>
            tx.id === txId
                ? {
                    ...tx,
                    signatures: tx.signatures + 1,
                    signers: [...tx.signers, 'you'],
                    missingSigns: tx.missingSigns.slice(1),
                    status: tx.signatures + 1 >= tx.required ? 'executed' : 'pending'
                }
                : tx
        ));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'text-green-400 bg-green-900/30';
            case 'pending': return 'text-yellow-400 bg-yellow-900/30';
            case 'executed': return 'text-blue-400 bg-blue-900/30';
            case 'expired': return 'text-red-400 bg-red-900/30';
            default: return 'text-gray-400 bg-gray-900/30';
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'owner': return 'text-purple-400 bg-purple-900/30';
            case 'signer': return 'text-blue-400 bg-blue-900/30';
            case 'viewer': return 'text-gray-400 bg-gray-900/30';
            default: return 'text-gray-400 bg-gray-900/30';
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navigation */}
            <div className="absolute top-0 w-full px-6 py-4 flex justify-between items-center z-50">
                <div className="text-xl font-bold text-white flex items-center cursor-pointer" onClick={() => window.location.href = '/portal'}>
                    <Home size={20} className="mr-2 text-teal-400" />
                    <span className="text-teal-400">Kaspa</span> MultiSig
                </div>
                <div className="flex space-x-2">
                    <button className="flex items-center bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded transition-colors">
                        <Wallet size={16} className="mr-1" />
                        Connect Wallet
                    </button>
                </div>
            </div>

            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 via-purple-900/10 to-indigo-900/10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(236,72,153,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(147,51,234,0.1),transparent_50%)]"></div>
            </div>

            <div className="relative pt-20 px-6 max-w-7xl mx-auto">
                {/* MultiSig Stats Header */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-pink-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Total Wallets</div>
                        <div className="text-lg font-bold text-pink-400">{multisigData.totalWallets}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Total Secured</div>
                        <div className="text-lg font-bold text-purple-400">{multisigData.totalSecured}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-indigo-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Active Signers</div>
                        <div className="text-lg font-bold text-indigo-400">{multisigData.activeSigners}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Pending Txs</div>
                        <div className="text-lg font-bold text-blue-400">{multisigData.pendingTransactions}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-teal-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Completed</div>
                        <div className="text-lg font-bold text-teal-400">{multisigData.completedTransactions}</div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/30 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Avg Sign Time</div>
                        <div className="text-lg font-bold text-green-400">{multisigData.averageSignTime}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* MultiSig Wallets & Actions */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-pink-500/30 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-pink-400 flex items-center">
                                    <Users className="mr-3" size={24} />
                                    MultiSig Wallets
                                </h2>

                                {/* Action Toggle */}
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setAction('create')}
                                        className={`px-3 py-1 rounded transition-all text-sm ${action === 'create'
                                            ? 'bg-pink-600 text-white'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            }`}
                                    >
                                        Create
                                    </button>
                                    <button
                                        onClick={() => setAction('propose')}
                                        className={`px-3 py-1 rounded transition-all text-sm ${action === 'propose'
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            }`}
                                    >
                                        Propose
                                    </button>
                                </div>
                            </div>

                            {/* Wallets Grid */}
                            <div className="grid grid-cols-1 gap-4 mb-6">
                                {wallets.map(wallet => (
                                    <div
                                        key={wallet.id}
                                        onClick={() => setSelectedWallet(wallet)}
                                        className={`bg-gray-800/50 border rounded-lg p-4 cursor-pointer transition-all hover:scale-[1.01] ${selectedWallet?.id === wallet.id
                                                ? 'border-pink-400 shadow-pink-500/30'
                                                : 'border-gray-600 hover:border-pink-500/50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <h3 className="font-bold text-white text-lg">{wallet.name}</h3>
                                                <div className="text-xs text-gray-400">{wallet.address}</div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(wallet.status)}`}>
                                                    {wallet.status}
                                                </span>
                                                <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(wallet.yourRole)}`}>
                                                    {wallet.yourRole}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <div className="text-gray-400">Balance</div>
                                                <div className="text-white font-bold">{wallet.balance}</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-400">Threshold</div>
                                                <div className="text-pink-400 font-bold">{wallet.threshold}</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-400">Pending</div>
                                                <div className="text-yellow-400 font-bold">{wallet.pendingTxs}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Action Panels */}
                            {action === 'create' && (
                                <div className="bg-gray-800/30 rounded-lg p-6">
                                    <h3 className="text-lg font-bold text-pink-400 mb-4">Create New MultiSig Wallet</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm text-gray-400 mb-2 block">Wallet Name</label>
                                            <input
                                                type="text"
                                                placeholder="e.g., Dev Team Wallet"
                                                value={createForm.name}
                                                onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                                                className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-400 mb-2 block">Signers</label>
                                            {createForm.signers.map((signer, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    placeholder={`Signer ${index + 1} address`}
                                                    value={signer}
                                                    onChange={(e) => {
                                                        const newSigners = [...createForm.signers];
                                                        newSigners[index] = e.target.value;
                                                        setCreateForm({ ...createForm, signers: newSigners });
                                                    }}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white mb-2"
                                                />
                                            ))}
                                            <button
                                                onClick={() => setCreateForm({ ...createForm, signers: [...createForm.signers, ''] })}
                                                className="text-pink-400 text-sm hover:text-pink-300"
                                            >
                                                + Add Signer
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm text-gray-400 mb-2 block">Required Signatures</label>
                                                <select
                                                    value={createForm.threshold}
                                                    onChange={(e) => setCreateForm({ ...createForm, threshold: parseInt(e.target.value) })}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white"
                                                >
                                                    {Array.from({ length: createForm.signers.filter(s => s).length }, (_, i) => (
                                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-400 mb-2 block">Timelock (hours)</label>
                                                <input
                                                    type="number"
                                                    value={createForm.timelock}
                                                    onChange={(e) => setCreateForm({ ...createForm, timelock: e.target.value })}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleMultisigAction}
                                        disabled={!createForm.name || createForm.signers.filter(s => s).length < 2 || transactionStatus === 'processing'}
                                        className={`w-full mt-6 py-3 rounded-lg font-bold text-lg transition-all ${transactionStatus === 'processing'
                                                ? 'bg-yellow-600 text-white cursor-not-allowed'
                                                : transactionStatus === 'success'
                                                    ? 'bg-green-600 text-white'
                                                    : createForm.name && createForm.signers.filter(s => s).length >= 2
                                                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white'
                                                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        {transactionStatus === 'processing' && (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Creating Wallet...
                                            </div>
                                        )}
                                        {transactionStatus === 'success' && (
                                            <div className="flex items-center justify-center">
                                                <CheckCircle className="mr-2" size={20} />
                                                Wallet Created!
                                            </div>
                                        )}
                                        {transactionStatus === 'idle' && 'Create MultiSig Wallet'}
                                    </button>
                                </div>
                            )}

                            {action === 'propose' && selectedWallet && (
                                <div className="bg-gray-800/30 rounded-lg p-6">
                                    <h3 className="text-lg font-bold text-purple-400 mb-4">
                                        Propose Transaction - {selectedWallet.name}
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm text-gray-400 mb-2 block">Transaction Type</label>
                                            <select
                                                value={proposeForm.type}
                                                onChange={(e) => setProposeForm({ ...proposeForm, type: e.target.value })}
                                                className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white"
                                            >
                                                <option value="transfer">Transfer Assets</option>
                                                <option value="parameter">Parameter Change</option>
                                                <option value="signer">Add/Remove Signer</option>
                                            </select>
                                        </div>

                                        {proposeForm.type === 'transfer' && (
                                            <>
                                                <div>
                                                    <label className="text-sm text-gray-400 mb-2 block">Recipient Address</label>
                                                    <input
                                                        type="text"
                                                        placeholder="kaspa:qp..."
                                                        value={proposeForm.recipient}
                                                        onChange={(e) => setProposeForm({ ...proposeForm, recipient: e.target.value })}
                                                        className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-sm text-gray-400 mb-2 block">Amount (KAS)</label>
                                                    <input
                                                        type="number"
                                                        placeholder="0.0"
                                                        value={proposeForm.amount}
                                                        onChange={(e) => setProposeForm({ ...proposeForm, amount: e.target.value })}
                                                        className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white"
                                                    />
                                                </div>
                                            </>
                                        )}

                                        <div>
                                            <label className="text-sm text-gray-400 mb-2 block">Description</label>
                                            <textarea
                                                placeholder="Describe the purpose of this transaction..."
                                                value={proposeForm.description}
                                                onChange={(e) => setProposeForm({ ...proposeForm, description: e.target.value })}
                                                className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white h-20 resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleMultisigAction}
                                        disabled={!proposeForm.description || transactionStatus === 'processing'}
                                        className={`w-full mt-6 py-3 rounded-lg font-bold text-lg transition-all ${transactionStatus === 'processing'
                                                ? 'bg-yellow-600 text-white cursor-not-allowed'
                                                : transactionStatus === 'success'
                                                    ? 'bg-green-600 text-white'
                                                    : proposeForm.description
                                                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white'
                                                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        {transactionStatus === 'processing' && (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Proposing Transaction...
                                            </div>
                                        )}
                                        {transactionStatus === 'success' && (
                                            <div className="flex items-center justify-center">
                                                <CheckCircle className="mr-2" size={20} />
                                                Transaction Proposed!
                                            </div>
                                        )}
                                        {transactionStatus === 'idle' && 'Propose Transaction'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Pending Transactions */}
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-pink-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-pink-400 mb-4 flex items-center">
                                <Clock className="mr-2" size={18} />
                                Pending Transactions
                            </h3>
                            <div className="space-y-3">
                                {pendingTransactions.filter(tx => tx.status === 'pending').map(tx => (
                                    <div key={tx.id} className="bg-gray-800/50 rounded-lg p-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-white text-sm">{tx.walletName}</span>
                                            <span className="text-xs text-gray-400">{tx.timeRemaining}</span>
                                        </div>
                                        <div className="text-xs text-gray-400 mb-2">{tx.description}</div>
                                        {tx.amount && (
                                            <div className="text-sm text-white mb-2">{tx.amount}</div>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-400">
                                                {tx.signatures}/{tx.required} signatures
                                            </span>
                                            {!tx.signers.includes('you') && (
                                                <button
                                                    onClick={() => handleSign(tx.id)}
                                                    className="text-xs bg-purple-600 hover:bg-purple-500 text-white px-2 py-1 rounded"
                                                >
                                                    Sign
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {pendingTransactions.filter(tx => tx.status === 'pending').length === 0 && (
                                    <div className="text-center text-gray-400 py-4 text-sm">
                                        No pending transactions
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Wallet Analytics */}
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-pink-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-pink-400 mb-4 flex items-center">
                                <BarChart3 className="mr-2" size={18} />
                                Wallet Analytics
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">Security Score</span>
                                        <span className="text-green-400">95%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">Transaction Success</span>
                                        <span className="text-blue-400">98%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">Signer Activity</span>
                                        <span className="text-purple-400">87%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Features */}
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-pink-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-pink-400 mb-4 flex items-center">
                                <Shield className="mr-2" size={18} />
                                Security Features
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="font-medium text-pink-400 mb-1">🔐 Multi-Signature</div>
                                    <div className="text-gray-300">Require multiple signatures for transaction approval, eliminating single points of failure.</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="font-medium text-purple-400 mb-1">⏱️ Timelock</div>
                                    <div className="text-gray-300">Optional time delays for critical transactions provide additional security layers.</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="font-medium text-indigo-400 mb-1">👥 Role Management</div>
                                    <div className="text-gray-300">Granular permissions for owners, signers, and viewers with different access levels.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiSigProtocol;
