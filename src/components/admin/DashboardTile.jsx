import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function DashboardTile({
    titleStyle,
    title = "Lorem Ipsum",
    subtitle = "Lorem Ipsum Dolor Sit Amet",
    count = "999.999",
    icon
}) {
    const defaultTitleStyle = "bg-blue-100 text-blue-800 border border-blue-500"

    return (
        <Card className="flex flex-col align-middle items-center w-64">
            <div className={cn(
                "flex items-center gap-2 py-1 px-3 rounded-full", // Base
                titleStyle || defaultTitleStyle // Override || Default
            )}>
                {icon}
                {title}
            </div>
            <p className="text-2xl font-bold">
                {count}
            </p>
            <p className="text-secondary-foreground">
                {subtitle}
            </p>
        </Card>
    )
}