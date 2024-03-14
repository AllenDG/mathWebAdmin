import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const useFetchAllUsersData = (selectedMonth) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        let usersQuery = query(usersCollection);

        // Filter users by selected month if provided
        if (selectedMonth) {
          const startOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
          const endOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
          usersQuery = query(usersCollection, where("createdAt", ">=", startOfMonth), where("createdAt", "<=", endOfMonth));
        }

        const querySnapshot = await getDocs(usersQuery);

        const usersData = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const id = doc.id;
          const createdAt = userData.createdAt ? userData.createdAt.toDate() : null;
          usersData.push({ id, ...userData, createdAt }); 
        });

        setUsers(usersData.reverse());
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [users,selectedMonth]); // Run useEffect whenever selectedMonth changes

  return { loading, users };
}

export default useFetchAllUsersData;
