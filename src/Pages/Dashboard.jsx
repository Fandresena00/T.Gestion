import Controle from "../components/dashboard/controle/Controle";
import TableList from "../components/dashboard/table_list/TableList";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Controle />
      <TableList />
    </div>
  );
}
