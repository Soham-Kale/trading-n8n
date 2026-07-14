import { Handle, Position } from "@xyflow/react";

export type PriceTriggerMetadata = {
    asset: string,
    price: number
}

export function PriceTrigger({ data }: {
    data: {
        metadata: PriceTriggerMetadata
    },
    isConnectable?: boolean
}) {
    return (
        <div className="min-w-40 rounded-lg border border-l-4 border-l-chart-1 bg-card px-4 py-3 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Price Trigger
            </div>
            <div className="mt-1.5 flex items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground">Asset</span>
                <span className="text-sm font-semibold">{data.metadata.asset}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground">Price</span>
                <span className="text-sm font-semibold">{data.metadata.price}</span>
            </div>
            <Handle type="source" position={Position.Right} className="size-2.5! bg-chart-1! border-background!"></Handle>
        </div>
    )
}