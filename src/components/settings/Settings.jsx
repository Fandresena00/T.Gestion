/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Settings.module.css";

export default function Settings({ contextValue }) {
  const { settings, updateSettings } = contextValue;

  const [setting, setSetting] = useState({
    priority: settings.priority,
  });

  const HandleSettings = () => {
    updateSettings({
      priority: setting.priority,
    });
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.container}>
          <h2>Settings</h2>

          <div className={styles.section}>
            <h3>Appearance :</h3>
            <select>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>

            <label>
              <input type="checkbox" />
              Vue compacte
            </label>
          </div>

          <div className={styles.section}>
            <h3>Cartes :</h3>
            <label>
              Status card limit :
              <input type="number" min="1" max="10" />
            </label>
            <h3>Tasks in card:</h3>
            <label>
              task in card limit :
              <input type="number" min="10" max="20" />
            </label>

            <label>
              Default priority :
              <select
                value={setting.priority}
                onChange={(e) =>
                  setSetting({
                    priority: e.target.value,
                  })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="Important">Important</option>
              </select>
            </label>

            <label>
              limit date alert ( day ) :
              <input type="number" min="1" max="30" />
            </label>
          </div>

          <div className={styles.section}>
            <h3>Automatisation :</h3>
            <label>
              <input type="checkbox" />
              Archivage automatique des cartes terminées
            </label>

            <label>
              <input type="checkbox" />
              Notification
            </label>
          </div>

          <div className={styles.buttons}>
            <button onClick={HandleSettings}>Save</button>
            <button>don&apos;t save</button>
          </div>
        </div>
      </div>
    </>
  );
}
