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
import type { PriceTriggerMetadata } from "@/nodes/triggers/PriceTrigger";
import type { TimerNodeMetadata } from "@/nodes/triggers/Timer";
import { Input } from "@/components/ui/input";

const SUPPORTED_ACTIONS = [{
    id: "timer",
    title: "Timer",
    Description: "Run this trigger every x seconds/minutes"
}, {
    id: "price-trigger",
    title: "Price Trigger",
    Description: "Runs whenever the price goes above or below certain number for an asset"
}]

const SUPPORTED_ASSETS =[ "SOL", "BTC", "ETH" ]

export const TriggerSheet = ({
    onSelect,
} : {
    onSelect: (kind: NodeKind, metatdata: NodeMetadata) => void,
}) => {
    const [metadata, setMetadata] = useState<PriceTriggerMetadata | TimerNodeMetadata>({
        time: 3600,
    });
    const [selectedTrigger, setSelectedTrigger] = useState(SUPPORTED_TRIGGERS[0].id);

    return <Sheet open={true}>
            <SheetTrigger>
                <Button variant="outline" className="capitalize">
                </Button>
            </SheetTrigger>
            <SheetContent
                className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
            >
                <SheetHeader>
                    <SheetTitle>Select Trigger</SheetTitle>
                    <SheetDescription>
                        Select the type of trigger that you need
                        <Select value={selectedTrigger} onValueChange={(value) => setSelectedTrigger(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a trigger" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {SUPPORTED_TRIGGERS.map(({ id, title }) => <>
                                        <SelectItem key={id} value={id}>{title}</SelectItem>
                                    </>)}
                                </SelectGroup>
                            </SelectContent>
                            </Select>

                            {selectedTrigger === "timer" && <div>
                                <div className="pt-4">
                                    Number of seconds after which to run the timer
                                    <Input value={metadata.time} onChange={(e) => setMetadata(metadata => ({
                                        ...metadata,
                                        time: Number(e.target.value),
                                    }))}></Input>
                                </div>
                            </div>}

                            {selectedTrigger === "price-trigger" && <div className="pt-4">
                                Price: 
                                <Input type="text" onChange={(e) => setMetadata(m => ({
                                    ...m,
                                    price: Number(e.target.value)
                                }))}></Input>
                                Asset:
                                <Select value={metadata.asset} onValueChange={(value) => setMetadata(metadata => ({
                                    ...metadata,
                                    asset: value,
                                }))}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select an asset" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {SUPPORTED_ASSETS.map((id ) => <>
                                                <SelectItem key={id} value={id}>{id}</SelectItem>
                                            </>)}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>}
                    </SheetDescription>
                </SheetHeader>
                
                <SheetFooter>
                    <Button 
                        onClick={() => 
                            onSelect(
                                selectedTrigger,
                                metadata 
                            )} 
                        type="submit">
                            Save Trigger
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
}