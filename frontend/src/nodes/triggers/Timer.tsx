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
        <div className="min-w-40 rounded-lg border border-l-4 border-l-chart-1 bg-card px-4 py-3 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Timer
            </div>
            <div className="mt-1.5 text-sm font-semibold">
                Every {data.metadata.time}s
            </div>
            <Handle type="source" position={Position.Right} className="size-2.5! bg-chart-1! border-background!"></Handle>
        </div>
    )
}