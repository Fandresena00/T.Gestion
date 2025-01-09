import TableList from "../components/board/table_list/TableList";
import Header from "../components/board/header/Header";

export default function Board() {
  return (
    <div className="dashboard">
      <Header />
      <TableList />
    </div>
  );
}
