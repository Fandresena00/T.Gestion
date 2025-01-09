import { Route, Routes } from "react-router-dom";
import Interface from "./Pages/Interface";
import Connection from "./Pages/Connection";
import Board from "./Pages/Board";

export default function App() {
  return (
    <Routes>
      <Route path="board" element={<Board />} />
      <Route path="connection" element={<Connection />} />
      <Route index element={<Interface />} />
    </Routes>
  );
}
