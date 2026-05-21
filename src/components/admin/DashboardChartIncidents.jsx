import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip } from "../ui/chart";
import { Pie, PieChart } from "recharts";

// Warna chart harus eksplisit HSL/HEX
const COLORS = [
    "#ef4444",
    "#3b82f6",
    "#f59e0b",
    "#10b981",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#f97316",
]

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, payload }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
            {`${payload.percentage}%`}
        </text>
    ) : null;
};

export function DashboardIncidentsChart({
    categories = [], // [{ key, label, count, percentage }]
}) {
    const chartData = categories
        .filter((cat) => cat.count > 0) // skip kategori dengan jumlah nol 
        .map((cat, index) => ({
            name: cat.label,
            value: cat.count,
            percentage: cat.percentage,
            fill: COLORS[index % COLORS.length],
        }));

    const chartConfig = chartData.reduce((acc, item, index) => {
        acc[item.name] = {
            label: item.name,
            color: COLORS[index % COLORS.length],
        };
        return acc;
    }, {});

    if (chartData.length === 0) {
        return <p className="text-center font-light text-muted-foreground py-8">Tidak ada data laporan...</p>;
    }

    return (
        <ChartContainer config={chartConfig} className="mx-auto max-w-xs aspect-square">
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    dataKey="value"
                />
                <ChartTooltip
                    content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const { name, value, percentage } = payload[0].payload;
                        return (
                            <div className="rounded-lg border bg-background px-3 py-2 text-sm shadow-md">
                                <p className="font-medium">{name}</p>
                                <p className="text-muted-foreground">{value} laporan · {percentage}%</p>
                            </div>
                        );
                    }}
                />
                <ChartLegend content={<ChartLegendContent />}/>
            </PieChart>
        </ChartContainer>
    )
}
