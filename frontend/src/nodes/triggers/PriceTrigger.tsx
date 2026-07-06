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
        <div className="rounded-md border bg-background px-4 py-2 shadow-sm">
            <div>
                {data.metadata.asset}
            </div>
            <div>
                {data.metadata.price}
            </div>
            <Handle type="source" position={Position.Right}></Handle>
        </div>
    )
}