import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import LeaderboardTable from "../components/LeaderboardTable";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import ItemsPerPage from "../components/ItemsPerPage";

export default function LeaderboardsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGame, setSelectedGame] = useState("Quiz Game");
  const [leaderboardData, setLeaderboardData] = useState([]);

  const fetchLeaderboardData = async () => {
    try {
      const q = collection(db, "leaderboards");

      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      data.sort((a, b) => b.score - a.score);
      const top20Data = data.slice(0, 20);
      setLeaderboardData(top20Data);
    } catch (error) {
      console.error("Error fetching leaderboard data: ", error);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleGameFilter = (event, gameType) => {
    event.preventDefault();
    setSelectedGame(gameType === selectedGame ? null : gameType);
    setCurrentPage(1);
  };

  const handleClearFilter = (event) => {
    event.preventDefault();
    setSelectedGame(null);
    setCurrentPage(1);
  };

  const filteredUsers = leaderboardData.filter((user) => {
    const searchLowerCase = searchTerm.toLowerCase();
    return (
      (!selectedGame || user.category === selectedGame) &&
      Object.values(user).some((value) =>
        typeof value === "string"
          ? value.toLowerCase().includes(searchLowerCase)
          : false
      )
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
  
  const handleDeleteLeaderboard = async (leaderboardId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this leaderboard?"
    );

    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "leaderboards", leaderboardId));
        alert("Deleted Successfully!");
        fetchLeaderboardData();
      } catch (error) {
        alert("Error deleting leaderboard:", error);
      }
    }
  };

  const gameTypes = ["All", "Quiz Game", "Turn Based Combat", "Memory Game"];
  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-semibold text-gray-900">
        Leaderboards
      </h1>
      <form className="mb-4">
        <Searchbar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        <div className="flex flex-wrap gap-3">
          <ItemsPerPage
            itemsPerPage={itemsPerPage}
            handleItemsPerPageChange={handleItemsPerPageChange}
          />
          <div className="flex flex-wrap gap-3">
            {gameTypes.map((gameType) => (
              <button
                key={gameType}
                onClick={(event) => {
                  if (gameType === "All") {
                    handleClearFilter(event);
                  } else {
                    handleGameFilter(event, gameType);
                  }
                }}
                className={
                  selectedGame === gameType
                    ? "bg-blue-500 text-white px-4 py-2 rounded"
                    : "px-4 py-2 rounded"
                }
              >
                {gameType}
              </button>
            ))}
          </div>
        </div>
      </form>
      <LeaderboardTable
        users={currentUsers}
        handleDelete={handleDeleteLeaderboard}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
