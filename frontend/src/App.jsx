import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import SubmitTask from "./pages/SubmitTask";
import LiveMonitor from "./pages/LiveMonitor";
import AIDecisions from "./pages/AIDecisions";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="submit" element={<SubmitTask />} />
          <Route path="monitor" element={<LiveMonitor />} />
          <Route path="decisions" element={<AIDecisions />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;