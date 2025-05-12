"use client";

import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createChart, ColorType, UTCTimestamp } from 'lightweight-charts';

interface Token {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

interface OHLCData {
  time: number; // UNIX timestamp in seconds
  open: number;
  high: number;
  low: number;
  close: number;
}

export default function ThetaPage() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [ohlcData, setOHLCData] = useState<OHLCData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchTokens();
    }
  }, [mounted]);

  useEffect(() => {
    if (mounted && selectedToken) {
      fetchOHLCData(selectedToken.id);
    }
  }, [mounted, selectedToken]);

  const fetchTokens = async () => {
    try {
      const response = await fetch('/api/crypto');
      if (!response.ok) throw new Error('Failed to fetch tokens');
      const data = await response.json();
      setTokens(data);
      if (data.length > 0) {
        setSelectedToken(data[0]);
      }
    } catch (err) {
      setError('Failed to fetch tokens');
    } finally {
      setLoading(false);
    }
  };

  const fetchOHLCData = async (tokenId: string) => {
    try {
      const response = await fetch(`/api/crypto/ohlc?id=${tokenId}&days=30`);
      if (!response.ok) throw new Error('Failed to fetch OHLC data');
      const data = await response.json();
      // Map CoinGecko OHLC array to lightweight-charts format
      const mapped = Array.isArray(data)
        ? data.map((item: number[]) => ({
            time: Math.floor(item[0] / 1000), // convert ms to seconds
            open: item[1],
            high: item[2],
            low: item[3],
            close: item[4],
          }))
        : [];
      setOHLCData(mapped);
    } catch (err) {
      setError('Failed to fetch OHLC data');
    }
  };

  useEffect(() => {
    if (!mounted || !chartContainerRef.current || ohlcData.length === 0) return;

    // Cleanup previous chart
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
        horzLines: { color: 'rgba(42, 46, 57, 0.5)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    const formattedData = ohlcData.map(item => ({
      time: item.time as UTCTimestamp,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close
    }));

    candlestickSeries.setData(formattedData);
    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [mounted, ohlcData, selectedToken]);

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <main className="min-h-screen py-6">
      <div className="container mx-auto max-w-7xl px-4">
        <h1 className="text-2xl font-bold mb-6">Theta Ecosystem Tokens</h1>
        
        {loading && <div className="p-4 text-center">Loading tokens...</div>}
        {error && <div className="p-4 text-center text-red-500">{error}</div>}
        
        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Tokens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tokens.map((token) => (
                      <button
                        key={token.id}
                        onClick={() => setSelectedToken(token)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedToken?.id === token.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-secondary'
                        }`}
                      >
                        <div className="font-medium">{token.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {typeof token.current_price === 'number'
                            ? `$${token.current_price.toLocaleString()}`
                            : 'N/A'}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedToken ? `${selectedToken.name} (${selectedToken.symbol.toUpperCase()})` : 'Select a token'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div ref={chartContainerRef} className="w-full h-[400px]" />
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 