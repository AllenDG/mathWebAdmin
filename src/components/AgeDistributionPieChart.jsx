import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend, Text } from "recharts";

const AgeDistributionPieChart = () => {
  // Dummy data for 3 accounts with ages 4, 6, and 9
  const users = [
    { birthdate: "2018-01-01" },
    { birthdate: "2016-01-01" },
    { birthdate: "2013-01-01" },
  ];

  const calculateAge = (birthday) => {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const calculateAgeGroup = (age) => {
    if (age >= 4 && age <= 6) {
      return "4";
    } else if (age === 9) {
      return "5";
    } else {
      return "6";
    }
  };

  const ageDistribution = users.reduce((acc, user) => {
    const age = calculateAge(user.birthdate);
    const ageGroup = calculateAgeGroup(age);

    if (acc[ageGroup]) {
      acc[ageGroup]++;
    } else {
      acc[ageGroup] = 1;
    }

    return acc;
  }, {});

  const totalUsers = users.length;

  const data = Object.keys(ageDistribution).map((ageGroup) => ({
    ageGroup,
    value: ageDistribution[ageGroup],
    percentage: ((ageDistribution[ageGroup] / totalUsers) * 100).toFixed(2),
  }));

  const COLORS = ["#0088FE", "#00C49F"];

  const renderCustomTooltip = ({ payload }) => {
    if (payload && payload.length > 0) {
      return (
        <div style={{ backgroundColor: "white", padding: "5px" }}>
          <p>{`Age Group: ${payload[0].payload.ageGroup}`}</p>
          <p>{`Count: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <PieChart width={600} height={600}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={200}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend
        layout="vertical"
        align="right"
        verticalAlign="middle"
        wrapperStyle={{
          right: 20,
          top: 50,
          bottom: 50,
          lineHeight: "24px",
        }}
      />
      {data.map((entry, index) => (
        <Text
          key={`text-${index}`}
          x={500}
          y={150 + index * 30}
          textAnchor="middle"
          verticalAnchor="middle"
          style={{ fontSize: 16 }}
        >
          {`Age of ${entry.ageGroup}: ${entry.percentage}%`}
        </Text>
      ))}
      <Tooltip content={renderCustomTooltip} />
    </PieChart>
  );
};

export default AgeDistributionPieChart;
