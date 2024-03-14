import HomeNavigation from "../components/HomeNavigation"
import ProtectedRoutes from "../components/ProtectedRoutes"
import DashboardScreen from "../pages/DashboardScreen"
import LeaderboardsScreen from "../pages/LeaderboardsScreen"
import LoginScreen from "../pages/LoginScreen"
import UsersScreen from "../pages/UsersScreen"
import ViewUserScreen from "../pages/ViewUserScreen"


const MainRoutes = [
  {
    path: "/",
    element: <ProtectedRoutes><LoginScreen/></ProtectedRoutes>,
  },
  {
    path: "/home",
    element: <ProtectedRoutes><HomeNavigation/></ProtectedRoutes>,
    children: [
      {
        path: "",
        element: <DashboardScreen/>,
      },
      {
        path: "leaderboards",
        element: <LeaderboardsScreen/>,
      },
      {
        path: "users",
        element: <UsersScreen/>,
      },
      {
        path: "user/:id",
        element: <ViewUserScreen/>,
      },
    ],
  },
]

export default MainRoutes