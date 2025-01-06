import TableList from "../components/board/table_list/TableList";
import Controle from "../components/board/controle/Controle";
import Header from "../components/board/header/Header";
import Sidebar from "../components/board/sidebar/Sidebar";

export default function Board() {
  return (
    <div className="dashboard">
      <Header />
      <Sidebar />
      <Controle />
      <TableList />
    </div>
  );
}
