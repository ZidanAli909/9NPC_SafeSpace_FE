import { useMemo } from "react";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

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

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    ) : null;
};

export function DashboardIncidentsChart({
    reportArray = [],
}) {
    const incidentCounts = reportArray.reduce((acc, report) => {
        const incident = report.incident || "Tidak Diketahui";
        acc[incident] = (acc[incident] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(incidentCounts).map(([name, value], index) => ({
        name,
        value,
        fill: COLORS[index % COLORS.length],
    }));

    // Config dinamis dari chartData
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
                {/* <Tooltip
                    formatter={(value, name) => [`${value} laporan`, name]}
                    contentStyle={{
                        borderRadius: "8px",
                        fontSize: "13px",
                    }}
                /> */}
                {/* <Legend
                    formatter={(value) => <span style={{ fontSize: "13px" }}>{value}</span>}
                /> */}
                <ChartTooltip content={<ChartTooltipContent />}/>
                <ChartLegend content={<ChartLegendContent />}/>
            </PieChart>
        </ChartContainer>
    )
}