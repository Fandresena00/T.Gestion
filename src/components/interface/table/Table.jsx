/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Table.module.css";
import Status from "./status/Status";
import UpdateCard from "./card/update_from/UpdateCard";
import Settings from "../settings/Settings";

export default function Table({ contextValue }) {
  const { status, addStatus, updateCardForm, settings } = contextValue;
  const [newStatus, setNewStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newStatus.trim()) {
      addStatus(newStatus);
      setNewStatus("");
    }
  };

  return (
    <>
      {settings.isVisible && <Settings contextValue={contextValue} />}
      {updateCardForm.isVisible && <UpdateCard contextValue={contextValue} />}
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.info_table}>
            <h1>Table Name</h1>
            <p>1 Jan 2025 - 5 Jan 2025</p>
          </div>
          <div className={styles.info_user}>
            <img src="/src/assets/image/thumb-1920-1379042.png" alt="" />
            <p>hard.05@gmail.com</p>
          </div>
        </div>
        <div className={styles.status_list}>
          {status.map((statusItem) => (
            <Status
              key={statusItem.id}
              status={statusItem}
              contextValue={contextValue}
            />
          ))}
          {status.length < 6 && (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="+ status"
                onChange={(e) => setNewStatus(e.target.value)}
                className={styles.add_status}
                value={newStatus}
              />
            </form>
          )}
        </div>
      </div>
    </>
  );
}
