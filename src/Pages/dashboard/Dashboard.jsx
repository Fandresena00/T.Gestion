import styles from "./Dashboard.module.css";
import TableList from "../../components/Dashboard/table_list/TableList";
import Controle from "../../components/Dashboard/controle/Controle";
import Header from "../../components/Dashboard/header/Header";
import Sidebar from "../../components/Dashboard/sidebar/Sidebar";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.mainContent}>
          <Controle />
          <TableList />
        </div>
      </div>
    </div>
  );
}
