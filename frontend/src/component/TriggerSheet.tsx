import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { NodeKind, NodeMetadata } from "./CreateWorkFlow";
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
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

    return <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="capitalize">
                </Button>
            </SheetTrigger>
            <SheetContent
                className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
            >
                <SheetHeader>
                    <SheetTitle>Select Trigger</SheetTitle>
                    <SheetDescription>
                        <Select>
                            <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {SUPPORTED_TRIGGERS.map(({ id, title }) => <>
                                        <SelectLabel>{title}</SelectLabel>
                                        <SelectItem onSelect={() => onSelect(
                                            kind,
                                            metadata 
                                        )} value={id}>{title}</SelectItem>
                                    </>)}
                                </SelectGroup>
                            </SelectContent>
                            </Select>
                    </SheetDescription>
                </SheetHeader>
                
                <SheetFooter>
                <Button type="submit">Save changes</Button>
                <SheetClose asChild>
                    <Button variant="outline">Cancel</Button>
                </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
}