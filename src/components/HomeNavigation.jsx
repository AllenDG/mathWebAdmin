import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


export default function HomeNavigation() {
  return (
    <div className="flex">
      <Sidebar/>
      <Outlet/>
    </div>
  )
}
