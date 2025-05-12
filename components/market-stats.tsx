'use client'

import { formatCompactNumber, formatPercentage, marketStats } from "@/lib/mockData"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const PIE_COLORS = ["#F7931A", "#627EEA", "#8884d8"] // BTC orange, ETH blue, Others purple

export function MarketStats() {
  const marketDistributionData = [
    { name: "BTC", value: marketStats.btcDominance },
    { name: "ETH", value: marketStats.ethDominance },
    { name: "Others", value: 100 - marketStats.btcDominance - marketStats.ethDominance }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-card rounded-lg p-4 shadow">
        <h3 className="text-lg font-medium mb-4">Market Overview</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Market Cap</span>
            <span className="font-medium">${formatCompactNumber(marketStats.totalMarketCap)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">24h Volume</span>
            <span className="font-medium">${formatCompactNumber(marketStats.totalVolume24h)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">BTC Dominance</span>
            <span className="font-medium">{formatPercentage(marketStats.btcDominance)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">ETH Dominance</span>
            <span className="font-medium">{formatPercentage(marketStats.ethDominance)}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg p-4 shadow">
        <h3 className="text-lg font-medium mb-4">Market Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Active Cryptocurrencies</span>
            <span className="font-medium">{marketStats.totalCryptos.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Active Exchanges</span>
            <span className="font-medium">{marketStats.totalExchanges.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-4 shadow md:col-span-2 lg:col-span-1">
        <h3 className="text-lg font-medium mb-3">Market Distribution</h3>
        <div className="h-[260px] flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={marketDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {marketDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `${value.toFixed(1)}%`}
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 w-full flex justify-center">
            <Legend
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
              iconType="circle"
              formatter={(value) => {
                const item = marketDistributionData.find(d => d.name === value)
                return `${value} (${item?.value.toFixed(1)}%)`
              }}
              wrapperStyle={{ position: 'static' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}