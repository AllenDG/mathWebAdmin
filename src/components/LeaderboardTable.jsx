import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc,} from 'firebase/firestore';
import Loading from './Loading';

export default function LeaderboardTable({ users, handleDelete }) {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async (id) => {
      try {
        const userDocRef = doc(db, "users", id);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserData((prevState) => ({
            ...prevState,
            [id]: userData,
          }));
        } else {
          alert("User document does not exist");
        }
      } catch (error) {
        alert("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    users.forEach((user) => {
      fetchUserData(user.userId);
    });
  }, [users]);


  const categories = [
    { title: 'First Name' },
    { title: 'Last Name' },
    { title: 'Age' },
    { title: 'Email' },
    { title: 'Contact Number' },
    { title: 'Game Type' },
    { title: 'Score' },
  ];

  if (loading) return <Loading/>

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
              <div className="text-sm text-gray-900">{userData[user.userId]?.firstName}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{userData[user.userId]?.lastName}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{userData[user.userId]?.age}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{userData[user.userId]?.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{userData[user.userId]?.contactNumber}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{user.category}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{user.score}</div>
            </td>
            <td className="flex gap-2 px-6 py-4 whitespace-nowrap">
              <Link className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' to={`/home/user/${user.userId}`} disabled={true}>
                View
              </Link>
              <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => handleDelete(user.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
