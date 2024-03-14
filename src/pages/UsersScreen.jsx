import { useState } from 'react';
import Loading from '../components/Loading';
import useFetchAllUsersData from '../hooks/useFetchAllUsersData';
import UserTable from '../components/UserTable';
import Searchbar from '../components/Searchbar';
import Pagination from '../components/Pagination';
import ItemsPerPage from '../components/ItemsPerPage';
import { db } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export default function UsersScreen() {
  const { users, loading } = useFetchAllUsersData();
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const filteredUsers = users.filter((user) => {
    const searchLowerCase = searchTerm.toLowerCase();
    return Object.values(user).some((value) =>
      typeof value === 'string' ? value.toLowerCase().includes(searchLowerCase) : false
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };


  const handleDeleteUsers = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "users", userId));
        alert("Deleted Successfully!");
      } catch (error) {
        alert("Error deleting user:", error);
      }
    }
  };
  return (
    <div className="w-full p-6">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className='mb-4 text-3xl font-semibold text-gray-900'>User Management</h1>
          <form className="mb-4">
            <Searchbar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            <ItemsPerPage itemsPerPage={itemsPerPage} handleItemsPerPageChange={handleItemsPerPageChange} /> 
          </form>
          <UserTable users={currentUsers} handleDelete={handleDeleteUsers} />          
          <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </>
      )}
    </div>
  );
}
