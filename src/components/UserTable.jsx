import { Link } from "react-router-dom";

export default function UserTable({ users, handleDelete }) {
  const categories = [
    { title: "First Name" },
    { title: "Last Name" },
    { title: "Age" },
    { title: "Email" },
    { title: "Contact Number" },
    { title: "Guardian" },
  ];

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          {categories.map((header, index) => (
            <th
              key={index}
              className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {header.title}
            </th>
          ))}
          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map((user, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{user.firstName}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{user.lastName}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{user.age}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{user.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{user.contactNumber}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{user.guardian}</div>
            </td>
            <td className="flex gap-2 px-6 py-4 whitespace-nowrap">
              <Link
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                to={`/home/user/${user.id}`}
              >
                View
              </Link>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
