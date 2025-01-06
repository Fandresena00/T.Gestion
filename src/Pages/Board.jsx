import styles from "./Dashboard.module.css";
import TableList from "../components/Dashboard/table_list/TableList";
import Controle from "../components/Dashboard/controle/Controle";
import Header from "../components/Dashboard/header/Header";
import Sidebar from "../components/Dashboard/sidebar/Sidebar";

export default function Board() {
  return (
    <div className={styles.dashboard}>
      <Header />
      <Sidebar />
      <Controle />
      <TableList />
    </div>
  );
}
