import { Handle, Position } from "@xyflow/react";

export type TimerNodeMetadata = {
    time: number,
}

export function Timer({ data }: {
    data: {
        metadata: TimerNodeMetadata
    },
    isConnectable?: boolean
}) {
    return (
        <div className="rounded-md border bg-background px-4 py-2 shadow-sm">
            Every {data.metadata.time / 3600} seconds
            <Handle type="source" position={Position.Right}></Handle>
        </div>
    )
}