import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function DashboardTile(
    
) {
    return (
        <Card className="flex flex-col align-middle items-center">
            <p className="py-1 px-3 rounded-full bg-green-200 text-green-700 border border-green-500">
                Lorem Ipsum
            </p>
            <p className="text-2xl font-bold">
                999.999.999
            </p>
            <p className="text-secondary-foreground">
                Lorem Ipsum
            </p>
        </Card>
    )
}