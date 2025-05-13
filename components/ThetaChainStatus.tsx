"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const RPC_URL = "https://eth-rpc-api.thetatoken.org/rpc";

export function ThetaChainStatus() {
  const [status, setStatus] = useState<'connected' | 'error' | 'connecting'>('connecting');
  const [block, setBlock] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    provider.getBlockNumber()
      .then((blockNumber) => {
        setStatus('connected');
        setBlock(blockNumber);
      })
      .catch((err) => {
        setStatus('error');
        setError(err.message || 'Unknown error');
      });
  }, []);

  return (
    <div className="mt-4 p-4 rounded-lg border bg-black/60 flex items-center gap-4">
      {status === 'connected' && (
        <>
          <span className="inline-block w-3 h-3 rounded-full bg-green-500" title="Connected" />
          <span className="font-medium">Connected to ThetaChain</span>
          <span className="text-sm text-muted-foreground">(Mainnet)</span>
          <span className="ml-auto text-xs text-muted-foreground">Block: {block}</span>
        </>
      )}
      {status === 'connecting' && (
        <>
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 animate-pulse" title="Connecting" />
          <span className="font-medium">Connecting to ThetaChain...</span>
        </>
      )}
      {status === 'error' && (
        <>
          <span className="inline-block w-3 h-3 rounded-full bg-red-500" title="Error" />
          <span className="font-medium text-red-500">Not connected to ThetaChain</span>
          <span className="ml-2 text-xs text-red-400">{error}</span>
        </>
      )}
      <span className="ml-4 text-xs text-muted-foreground">RPC: {RPC_URL}</span>
    </div>
  );
} 