import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import { TriggerSheet } from './TriggerSheet';
import { PriceTrigger } from '@/nodes/triggers/PriceTrigger';
import { Timer } from '@/nodes/triggers/Timer';

const nodeType = {
    "price-trigger": PriceTrigger,
    "timer": Timer,
}

export type NodeKind = "price-trigger" | "timer" | "hyperliquid" | "backpack" | "lighter"
export type NodeMetadata = any;

interface NodeType {
    type: NodeKind,
    data: {
        kind: "action" | "trigger",
        metadata: NodeMetadata,
    },
    id: string, position: { x: number, y: number },
} 

interface Edge {
    id: string, 
    source: string, 
    target: string
}

export default function CreateWorkFlow() {
    const [nodes, setNodes] = useState<NodeType[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    
    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    const onConnectEnd = useCallback(
        (params, connectionInfo) => {
            console.log(connectionInfo)
        },
        []
    )
    
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            {!nodes.length && <TriggerSheet onSelect={(type, metadata) => 
                setNodes([...nodes, {
                    id: Math.random().toString(),
                    type,
                    data: {
                        kind: "trigger",
                        metadata,
                    },
                    position: { x: 0, y: 0},
                }])
            }/>}

            <ReactFlow
                nodeTypes={nodeType}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectEnd={onConnectEnd}
                fitView
            />
        </div>
    );
}
