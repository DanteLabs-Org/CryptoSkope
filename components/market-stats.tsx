import { formatCompactNumber, formatPercentage, marketStats } from "@/lib/mockData"

export function MarketStats() {
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
        <div className="flex items-center gap-3 mt-6">
          <div className="h-8 flex-1 bg-chart-1/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-chart-1 rounded-full" 
              style={{ width: `${marketStats.btcDominance}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">BTC</span>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="h-8 flex-1 bg-chart-2/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-chart-2 rounded-full" 
              style={{ width: `${marketStats.ethDominance}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">ETH</span>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="h-8 flex-1 bg-chart-3/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-chart-3 rounded-full" 
              style={{ width: `${100 - marketStats.btcDominance - marketStats.ethDominance}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">Others</span>
        </div>
      </div>
    </div>
  )
}