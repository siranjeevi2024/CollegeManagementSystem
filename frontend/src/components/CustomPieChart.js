// import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// const data = [
//     { name: 'Group A', value: 400 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//         <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//             {`${(percent * 100).toFixed(0)}%`}
//         </text>
//     );
// };

// const PieChart = () => {
//     return (
//         <ResponsiveContainer width="100%" height={400}>
//             <PieChart>
//                 <Pie
//                     data={data}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={renderCustomizedLabel}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                 >
//                     {data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                 </Pie>
//             </PieChart>
//         </ResponsiveContainer>
//     );
// };

// export default PieChart;

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const generateDistinctColors = (count) => {
    const colors = [];
    const goldenRatioConjugate = 0.618033988749895;

    for (let i = 0; i < count; i++) {
        const hue = (i * goldenRatioConjugate) % 1;
        const color = hslToRgb(hue, 0.6, 0.6);
        colors.push(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    }

    return colors;
};

// Helper function to convert HSL to RGB
const hslToRgb = (h, s, l) => {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // Achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, value } = payload[0].payload;
        return (
            <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{`${name}: ${value}`}</p>
            </div>
        );
    }
    return null;
};

const CustomPieChart = ({ data, showLegend = true }) => {
    const getColor = (name) => {
        if (name === 'Present') return '#4caf50'; // green for present
        if (name === 'Absent') return '#f44336'; // red for absent
        // For other data (e.g., grades), use distinct colors
        const colors = generateDistinctColors(data.length);
        const index = data.findIndex(d => d.name === name);
        return colors[index % colors.length];
    };

    return (
        <ResponsiveContainer width="100%" height={200}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                {showLegend && <Legend />}
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;
