import { Flex2 } from "@/components/ui/containers"

export function Bounce() {
    return (
        <Flex2>
            <div className="size-2 animate-bounce rounded-full bg-neutral-500 [animation-delay:-0.3s]" />
            <div className="size-2 animate-bounce rounded-full bg-neutral-500 [animation-delay:-0.13s]" />
            <div className="rounded-full size-2 animate-bounce bg-neutral-500" />
        </Flex2>
    );
}