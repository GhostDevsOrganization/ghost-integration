import { Buffer } from 'buffer';
import { isMobile } from '../utils/walletDetect';

const KAS_CHAIN_ID = 1234; // Update with correct Kasware chain ID

export const connectKasware = async () => {
  if (isMobile()) {
    // Mobile wallet connection is not supported
    throw new Error('Kasware mobile connection is not supported.');
  } else {
    // Desktop flow using extension
    if (!window.kasware) {
      throw new Error('Kasware extension not detected');
    }
    const accounts = await window.kasware.requestAccounts();
    return {
      accounts: accounts,
      connector: null
    };
  }
};

export const signTransaction = async (connector, txData) => {
  if (connector) {
    // Mobile WalletConnect flow
    return new Promise((resolve, reject) => {
      connector.sendTransaction(txData)
        .then(resolve)
        .catch(reject);
    });
  } else if (window.kasware) {
    // Desktop extension flow
    return window.kasware.signTransaction(txData);
  }
  throw new Error('No wallet connection available');
};

export const disconnectKasware = (connector) => {
  if (connector && connector.connected) {
    connector.killSession();
  }
  // No explicit disconnect needed for extension
};

export async function fetchKaspaBalance(address) {
  const response = await fetch(`https://api.kaspascan.io/v1/address/${address}`);
  if (!response.ok) throw new Error('Failed to fetch balance');
  const data = await response.json();
  // Convert from sompi to KAS (1e8 sompi = 1 KAS)
  return data.balance / 1e8;
}
