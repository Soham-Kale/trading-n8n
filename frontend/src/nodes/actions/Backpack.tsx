import { Handle, Position } from "@xyflow/react"
import type { TradingMetadata } from "./Lighter"

export function Backpack({ data }: {
    data: {
        metadata: TradingMetadata,
    }
}) {
    return (
        <div className="min-w-40 rounded-lg border border-l-4 border-l-chart-3 bg-card px-4 py-3 shadow-sm">
            <div className="text-sm font-semibold">Backpack Trade</div>
            <div className="mt-1.5 flex items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground">Type</span>
                <span className="text-sm font-medium">{data.metadata.type}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground">Symbol</span>
                <span className="text-sm font-medium">{data.metadata.symbol}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground">Qty</span>
                <span className="text-sm font-medium">{data.metadata.qty}</span>
            </div>
            <Handle type="source" position={Position.Right} className="size-2.5! bg-chart-3! border-background!"></Handle>
            <Handle type="target" position={Position.Left} className="size-2.5! bg-chart-3! border-background!"></Handle>
        </div>
    )
}