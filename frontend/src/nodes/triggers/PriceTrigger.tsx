import { Handle, Position } from "@xyflow/react";

export type PriceTriggerMetadata = {
    asset: string,
    price: number
}

export function PriceTrigger({ data, isConnactable }: {
    data: {
        metadata: PriceTriggerMetadata
    },
    isConnactable: boolean
}) {
    return (
        <div>
            {data.metadata.asset}
            {data.metadata.price}
            <Handle type="source" position={Position.Right}></Handle>
        </div>
    )
}