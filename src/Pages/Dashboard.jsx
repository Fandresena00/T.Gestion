import Controle from "../components/controle/Controle";
import TableList from "../components/table_list/TableList";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Controle />
      <TableList />
    </div>
  );
}
