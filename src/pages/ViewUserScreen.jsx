import { useParams } from 'react-router-dom';
import useFetchUserData from '../hooks/useFetchUserData';
import Loading from '../components/Loading';

export default function ViewUserScreen() {
  const { id } = useParams();
  const { user, loading } = useFetchUserData({ id });

  return (
    <div className="p-6">
      {loading ? (
        <Loading />
      ) : user ? ( 
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-[200px]">
          <img
            className="w-full h-40 object-cover"
            src={user.profilePicture ? user.profilePicture : "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"}
            alt={`Profile of ${user.firstName} ${user.lastName}`}
          />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{user.firstName} {user.lastName}</h2>
            <p className="text-gray-600 mb-2">{user.email}</p>
          </div>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
}
