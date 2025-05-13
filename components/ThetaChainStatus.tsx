import React from 'react';

export const ThetaChainStatus: React.FC = () => {
  // Placeholder: always show connected for now
  return (
    <div className="flex items-center gap-3 p-4 bg-black/60 rounded-lg border border-blue-900 flex-wrap">
      <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
      <span className="font-medium text-green-300">Connected to ThetaChain</span>
      <span className="text-xs text-blue-200 ml-4">Network: Mainnet</span>
      <span className="text-xs text-blue-200 ml-4">RPC: https://eth-rpc-api.thetatoken.org/rpc</span>
      <span className="text-xs text-blue-200 ml-4">DEX Contract: 0x2D65cf52EC55702eAee7ABF38e789e8E0048D7dD</span>
      <span className="text-xs text-blue-200 ml-4 break-all">Token Address: 0x4Dc08B15Ea0E10B96c41Aec22Fab934Ba15c983e</span>
    </div>
  );
}; 