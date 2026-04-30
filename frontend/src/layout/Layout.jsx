import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ display: "flex", background: "transparent" }}>
      
      <Sidebar />

      <div
        style={{
          marginLeft: "270px",
          width: "calc(100% - 270px)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Header />

        <main
          style={{
            padding: "30px 40px 60px 40px",
            flex: 1,
            color: "white"
          }}
        >
          <Outlet />
        </main>
      </div>

    </div>
  );
}