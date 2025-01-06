/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Table.module.css";
import Status from "./table/status/Status";
import UpdateCard from "./table/card/update_from/UpdateCard";
import Settings from "./settings/Settings";

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

      {/* Affiche le formulaire de mise à jour uniquement quand nécessaire */}
      {updateCardForm.isVisible && <UpdateCard contextValue={contextValue} />}

      <div className={styles.container}>
        {/* ================== INFORMATION ================ */}
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

        {/* =================== TASK ======================= */}
        <div className={styles.status_list}>
          {status.map((status) => (
            <Status
              key={status.id}
              status={status}
              contextValue={contextValue}
            />
          ))}
          {/* Limite le nombre de statuts à 6 */}
          {status.length < 5 && (
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
