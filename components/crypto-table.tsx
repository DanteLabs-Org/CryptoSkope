"use client"

import { useState } from "react"
import { cryptos, formatCurrency, formatCompactNumber, formatPercentage, getPriceChangeColor } from "@/lib/mockData"
import { SparklineChart } from "./sparkline-chart"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { ArrowUpIcon, ArrowDownIcon, ArrowUpDownIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"

type SortField = 'name' | 'price' | 'marketCap' | 'volume' | 'priceChange.24h' | null
type SortDirection = 'asc' | 'desc'

export function CryptoTable() {
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const sortedCryptos = [...cryptos].sort((a, b) => {
    if (!sortField) return 0
    
    let comparison = 0
    
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name)
    } else if (sortField === 'price') {
      comparison = a.price - b.price
    } else if (sortField === 'marketCap') {
      comparison = a.marketCap - b.marketCap
    } else if (sortField === 'volume') {
      comparison = a.volume - b.volume
    } else if (sortField === 'priceChange.24h') {
      comparison = a.priceChange['24h'] - b.priceChange['24h']
    }
    
    return sortDirection === 'asc' ? comparison : -comparison
  })

  return (
    <div className="rounded-md border bg-card">
      <div className="p-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">Cryptocurrency Prices</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">#</TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="hover:bg-transparent p-0 h-auto font-medium flex items-center gap-1"
                  onClick={() => handleSort('name')}
                >
                  Name
                  <ArrowUpDownIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button 
                  variant="ghost" 
                  className="hover:bg-transparent p-0 h-auto font-medium flex items-center gap-1 ml-auto"
                  onClick={() => handleSort('price')}
                >
                  Price
                  <ArrowUpDownIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button 
                  variant="ghost" 
                  className="hover:bg-transparent p-0 h-auto font-medium flex items-center gap-1 ml-auto"
                  onClick={() => handleSort('priceChange.24h')}
                >
                  24h %
                  <ArrowUpDownIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TableHead>
              <TableHead className="text-right hidden md:table-cell">
                <Button 
                  variant="ghost" 
                  className="hover:bg-transparent p-0 h-auto font-medium flex items-center gap-1 ml-auto"
                  onClick={() => handleSort('marketCap')}
                >
                  Market Cap
                  <ArrowUpDownIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TableHead>
              <TableHead className="text-right hidden md:table-cell">
                <Button 
                  variant="ghost" 
                  className="hover:bg-transparent p-0 h-auto font-medium flex items-center gap-1 ml-auto"
                  onClick={() => handleSort('volume')}
                >
                  Volume (24h)
                  <ArrowUpDownIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TableHead>
              <TableHead className="w-[100px] hidden md:table-cell">Last 7 Days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCryptos.map((crypto, index) => {
              const isPositive = crypto.priceChange['24h'] > 0
              const priceChangeColor = isPositive ? "text-green-500" : "text-red-500"
              const Icon = isPositive ? ArrowUpIcon : ArrowDownIcon
              
              return (
                <TableRow key={crypto.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 relative shrink-0">
                        <Image 
                          src={crypto.iconUrl} 
                          alt={crypto.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{crypto.name}</div>
                        <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(crypto.price, 'USD', crypto.price < 10 ? 4 : 2)}
                  </TableCell>
                  <TableCell className={`text-right ${priceChangeColor}`}>
                    <div className="flex items-center justify-end gap-1">
                      <Icon className="h-3.5 w-3.5" />
                      {formatPercentage(crypto.priceChange['24h'])}
                    </div>
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    ${formatCompactNumber(crypto.marketCap)}
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    ${formatCompactNumber(crypto.volume)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <SparklineChart 
                      data={crypto.sparkline} 
                      color={isPositive ? "rgba(34, 197, 94, 0.7)" : "rgba(239, 68, 68, 0.7)"}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}