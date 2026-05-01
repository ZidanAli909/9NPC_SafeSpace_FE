import { Badge } from "@/components/ui/badge"
import { File } from "lucide-react";

export function DashboardReportTableItem() {
    return (
        <div className="flex flex-row gap-4 items-center py-2 px-4 border-t">
            <div className="w-10 aspect-square flex justify-center items-center bg-secondary text-white rounded-md">
                <File className="text-secondary-foreground" />
            </div>

            <div className="flex-1">
                <p className="font-medium">Lorem Ipsum Dolor Sit Amet</p>

                <div className="flex flex-row gap-1 text-xs">
                    <p>Lorem Ipsum</p>
                    <p>·</p>
                    <p>24 jam lalu</p>
                    <p>·</p>
                    <p>Username12345</p>
                </div>
            </div>

            <div className="flex flex-row gap-2">
                <Badge variant="secondary">New</Badge>
                <Badge>Important</Badge>
            </div>
        </div>
    )
}