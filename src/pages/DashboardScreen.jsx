import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import useFetchAllUsersData from "../hooks/useFetchAllUsersData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import RecentUsers from "../components/RecentUsers";
import AgeDistributionPieChart from "../components/AgeDistributionPieChart";

export default function DashboardScreen() {
  const { users, loading } = useFetchAllUsersData();
  const aggregateUserDataByMonth = () => {
    const aggregatedData = {};

    users.forEach((user) => {
      const createdAt = user.createdAt ? new Date(user.createdAt) : null;
      const monthYear = createdAt
        ? createdAt.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })
        : "March";

      if (aggregatedData[monthYear]) {
        aggregatedData[monthYear]++;
      } else {
        aggregatedData[monthYear] = 1;
      }
    });

    return Object.keys(aggregatedData).map((month) => ({
      month,
      count: aggregatedData[month],
    }));
  };

  const aggregatedUsersByMonth = aggregateUserDataByMonth();

  if (loading) return <Loading />;

  return (
    <div className="w-full p-6">
      <h1 className="mb-4 text-3xl font-semibold text-gray-900">
        Admin Dashboard
      </h1>

      <div className="flex justify-center">
        <div className="w-3/5 bg-gray-200 rounded-lg p-3 mb-6">
          <h2 className="text-xl font-semibold mb-2">Users by Month</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={aggregatedUsersByMonth}
              margin={{ top: 5, right: 40, left: 40, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-3/5 bg-gray-200 rounded-lg p-3 mb-6">
          <RecentUsers users={users} />
        </div>
      </div>

      
    </div>
  );
}
