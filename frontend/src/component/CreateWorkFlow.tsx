import { useState, useCallback } from 'react';
import { ReactFlow, Background, Controls, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import { TriggerSheet } from './TriggerSheet';
import { PriceTrigger, type PriceTriggerMetadata } from '@/nodes/triggers/PriceTrigger';
import { Timer, type TimerNodeMetadata } from '@/nodes/triggers/Timer';
import { Lighter, type TradingMetadata } from '@/nodes/actions/Lighter';
import { ActionSheet } from './ActionSheet';
import { Backpack } from '@/nodes/actions/Backpack';
import { Hyperliquid } from '@/nodes/actions/Hyperliquid';

const nodeType = {
    "price-trigger": PriceTrigger,
    "timer": Timer,
    "lighter": Lighter,
    "backpack": Backpack,
    "hyperliquid": Hyperliquid
}

export type NodeKind = "price-trigger" | "timer" | "hyperliquid" | "backpack" | "lighter"
export type NodeMetadata = TimerNodeMetadata | PriceTriggerMetadata | TradingMetadata;

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
    const [selectAction, setSelectAction] = useState<{
        position: {
            x: number,
            y: number
        },
        startingNodeId: string 
    } | null>(null);
    
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

    const POSITION_OFFSET = 10;

    const onConnectEnd = useCallback(
        (params, connectionInfo) => {
            if(!connectionInfo.valid) {
                setSelectAction({
                    startingNodeId: connectionInfo.fromNode.id,
                    position: {
                        x: connectionInfo.from.x + POSITION_OFFSET,
                        y: connectionInfo.from.y + POSITION_OFFSET
                    }
                })
            }
        },
        []
    )
    
    return (
        <div className="w-screen h-screen bg-muted/30">
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

            {selectAction && <ActionSheet onSelect={(type, metadata) => {
                const nodeId = Math.random().toString();
                setNodes([...nodes, {
                    id: nodeId,
                    type,
                    data: {
                        kind: "action",
                        metadata,
                    },
                    position: selectAction.position,
                }]);
                setEdges([...edges, {
                    id: `${selectAction.startingNodeId} - ${nodeId}` ,
                    source: selectAction.startingNodeId,
                    target: nodeId,
                }]);
                setSelectAction(null);
            }
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
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}
