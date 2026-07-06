import { Handle, Position } from "@xyflow/react";

export type TimerNodeMetadata = {
    time: number,
}

export function Timer({ data, isConnactable }: {
    data: {
        metadata: TimerNodeMetadata
    },
    isConnactable: boolean
}) {
    return (
        <div>
            Every {data.metadata.time / 3600} seconds
            <Handle type="source" position={Position.Right}></Handle>
        </div>
    )
}