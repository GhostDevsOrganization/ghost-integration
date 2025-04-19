/**
 * Wallet detection utilities
 */

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};


export const buildKaspaURI = (params) => {
  const base = `kaspa:${params.address || 'auto'}`;
  const query = new URLSearchParams({
    amount: params.value ? Math.round(params.value * 1e8).toString() : '',
    label: params.label || '',
    message: params.message || '',
    currency: params.currency || 'KAS'
  }).toString();
  return `${base}?${query}`;
};

export const validateKaspaSession = (session) => {
  if (!session?.namespaces?.kaspa?.accounts?.[0]) {
    throw new Error('Invalid session structure');
  }
  
  const [,, address] = session.namespaces.kaspa.accounts[0].split(':');
  if (!/^kaspa:[a-z0-9]{60}$/.test(address)) {
    throw new Error('Invalid Kaspa address format');
  }
  
  return address;
};


export const isKaswareInstalled = () => {
  return new Promise((resolve) => {
    // Desktop - check for extension
    if (!isMobile()) {
      return resolve(!!window.kasware);
    }
    
    // Mobile - check for WalletConnect capability
    // We'll assume Kasware mobile supports WalletConnect
    resolve(true);
  });
};
