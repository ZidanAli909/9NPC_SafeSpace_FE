import { Loader2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { AnimatedEllipsis } from "./AnimatedEllipsis";

export function LoadingCard({
    className,
}) {
    return (
        <Card className={`w-32 mx-auto ${className || ''}`}>
            <CardContent className="flex flex-col items-center gap-2 p-2">
                <Loader2 className="animate-spin text-primary" />
                <p className="font-light text-muted-foreground">Loading<AnimatedEllipsis /></p>
            </CardContent>
        </Card>
    )
}