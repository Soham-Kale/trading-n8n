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

const SUPPORTED_TRIGGERS = [{
    id: "timer",
    title: "Timer",
    Description: "Run this trigger every x seconds/minutes"
}, {
    id: "price-trigger",
    title: "Price Trigger",
    Description: "Runs whenever the price goes above or below certain number for an asset"
}]

export const TriggerSheet = ({
    onSelect,
} : {
    onSelect: (kind: NodeKind, metatdata: NodeMetadata) => void,
}) => {

    const [metadata, setMetadata] = useState({});
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
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {SUPPORTED_TRIGGERS.map(({ id, title }) => <>
                                        <SelectItem key={id} value={id}>{title}</SelectItem>
                                    </>)}
                                </SelectGroup>
                            </SelectContent>
                            </Select>
                    </SheetDescription>
                </SheetHeader>
                
                <SheetFooter>
                    <Button onClick={() => 
                                onSelect(
                                    selectedTrigger,
                                    metadata 
                                )} type="submit">Save Trigger</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
}