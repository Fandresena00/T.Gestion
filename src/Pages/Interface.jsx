/* eslint-disable react/prop-types */
import Navbar from "../components/navbar/Navbar";
import Table from "../components/table/Table";

export default function Interface({ contextValue }) {
  return (
    <div className="interface">
      <Navbar contextValue={contextValue} />
      <Table contextValue={contextValue} />
    </div>
  );
}
