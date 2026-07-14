import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { NodeKind, NodeMetadata } from "./CreateWorkFlow";
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { TradingMetadata } from "@/nodes/actions/Lighter";

const SUPPORTED_ACTIONS = [{
    id: "hyperliquid",
    title: "Hyperliquid",
    Description: "Place a trade on hyperliquid"
}, {
    id: "lighter",
    title: "Lighter",
    Description: "Place a trade on lighter"
}, {
    id: "backpack",
    title: "Backpack",
    Description: "Place a trade on backpack"
},]

export const SUPPORTED_ASSETS =[ "SOL", "BTC", "ETH" ]

export const ActionSheet = ({
    onSelect,
} : {
    onSelect: (kind: NodeKind, metatdata: NodeMetadata) => void,
}) => {
    const [metadata, setMetadata] = useState<TradingMetadata | {}>({});
    const [selectedActions, setSelectedActions] = useState(SUPPORTED_ACTIONS[0].id);

    return <Sheet open={true}>
            <SheetTrigger>
                <Button variant="outline" className="capitalize">
                </Button>
            </SheetTrigger>
            <SheetContent
                className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
            >
                <SheetHeader>
                    <SheetTitle>Select Action</SheetTitle>
                    <SheetDescription>
                        Select the type of action that you need
                    </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col gap-4 px-4">
                    <div className="flex flex-col gap-2">
                        <Label>Action type</Label>
                        <Select value={selectedActions} onValueChange={(value) => setSelectedActions(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a action"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {SUPPORTED_ACTIONS.map(({ id, title }) => <>
                                        <SelectItem key={id} value={id}>{title}</SelectItem>
                                    </>)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {(selectedActions === "hyperliquid" || selectedActions === "lighter" || selectedActions === "backpack") && <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Type</Label>
                            <Select value={metadata?.type} onValueChange={(value) => setMetadata(metadata => ({
                                ...metadata,
                                type: value,
                            }))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select an asset" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value={"logn"}>LONG</SelectItem>
                                        <SelectItem value={"short"}>SHORT</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Symbol</Label>
                            <Select value={metadata?.symbol} onValueChange={(value) => setMetadata(metadata => ({
                                ...metadata,
                                symbol: value,
                            }))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select an asset" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {SUPPORTED_ASSETS.map(asset => <SelectItem key={asset} value={asset}>
                                            {asset}
                                        </SelectItem>)}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Qty</Label>
                            <Input value={metadata?.qty} onChange={(e) => setMetadata(metadata => ({
                                ...metadata,
                                qty: Number(e.target.value),
                            }))}></Input>
                        </div>
                    </div>}

                    {selectedActions === "price-trigger" && <div className="flex flex-col gap-2">
                        <Label>Price</Label>
                        <Input type="text" onChange={(e) => setMetadata(m => ({
                            ...m,
                            price: Number(e.target.value),
                        }))}></Input>
                    </div>}
                </div>
                
                <SheetFooter>
                    <Button 
                        onClick={() => 
                            onSelect(
                                selectedActions,
                                metadata 
                            )} 
                        type="submit">
                            Save Actions
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
}