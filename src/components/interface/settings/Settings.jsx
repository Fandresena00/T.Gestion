/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./Settings.module.css";

/**
 * Composant de paramètres de l'application
 * Permet de configurer les préférences utilisateur
 */
export default function Settings({ contextValue }) {
  const { settings, updateSettings, toggleSettings } = contextValue;

  // État local pour les paramètres en cours de modification
  const [setting, setSetting] = useState({
    priority: settings.priority,
    theme: settings.theme,
    compactView: settings.compactView,
    cardLimit: settings.cardLimit,
    taskLimit: settings.taskLimit,
    dateAlert: settings.dateAlert,
    autoArchive: settings.autoArchive,
    notifications: settings.notifications,
  });

  // Met à jour les paramètres locaux quand les paramètres globaux changent
  useEffect(() => {
    setSetting({
      priority: settings.priority,
      theme: settings.theme,
      compactView: settings.compactView,
      cardLimit: settings.cardLimit,
      taskLimit: settings.taskLimit,
      dateAlert: settings.dateAlert,
      autoArchive: settings.autoArchive,
      notifications: settings.notifications,
    });
  }, [settings]);

  /**
   * Gère la sauvegarde des paramètres
   */
  const handleSettings = () => {
    updateSettings(setting);
    toggleSettings();
  };

  /**
   * Gère l'annulation des modifications
   */
  const handleCancel = () => {
    setSetting({
      priority: settings.priority,
      theme: settings.theme,
      compactView: settings.compactView,
      cardLimit: settings.cardLimit,
      taskLimit: settings.taskLimit,
      dateAlert: settings.dateAlert,
      autoArchive: settings.autoArchive,
      notifications: settings.notifications,
    });
    toggleSettings();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <h2>Settings</h2>

        <div className={styles.section}>
          <h3>Appearance :</h3>
          <select
            value={setting.theme}
            onChange={(e) =>
              setSetting((prev) => ({ ...prev, theme: e.target.value }))
            }
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>

          <label>
            <input
              type="checkbox"
              checked={setting.compactView}
              onChange={(e) =>
                setSetting((prev) => ({
                  ...prev,
                  compactView: e.target.checked,
                }))
              }
            />
            Compact View
          </label>
        </div>

        <div className={styles.section}>
          <h3>Cards :</h3>
          <label>
            Status card limit :
            <input
              type="number"
              min="1"
              max="10"
              value={setting.cardLimit}
              onChange={(e) =>
                setSetting((prev) => ({
                  ...prev,
                  cardLimit: parseInt(e.target.value),
                }))
              }
            />
          </label>

          <h3>Tasks in card:</h3>
          <label>
            Task limit per card :
            <input
              type="number"
              min="10"
              max="20"
              value={setting.taskLimit}
              onChange={(e) =>
                setSetting((prev) => ({
                  ...prev,
                  taskLimit: parseInt(e.target.value),
                }))
              }
            />
          </label>

          <label>
            Default priority :
            <select
              value={setting.priority}
              onChange={(e) =>
                setSetting((prev) => ({ ...prev, priority: e.target.value }))
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="important">Important</option>
            </select>
          </label>

          <label>
            Date alert (days) :
            <input
              type="number"
              min="1"
              max="30"
              value={setting.dateAlert}
              onChange={(e) =>
                setSetting((prev) => ({
                  ...prev,
                  dateAlert: parseInt(e.target.value),
                }))
              }
            />
          </label>
        </div>

        <div className={styles.section}>
          <h3>Automation :</h3>
          <label>
            <input
              type="checkbox"
              checked={setting.autoArchive}
              onChange={(e) =>
                setSetting((prev) => ({
                  ...prev,
                  autoArchive: e.target.checked,
                }))
              }
            />
            Auto-archive completed cards
          </label>

          <label>
            <input
              type="checkbox"
              checked={setting.notifications}
              onChange={(e) =>
                setSetting((prev) => ({
                  ...prev,
                  notifications: e.target.checked,
                }))
              }
            />
            Enable notifications
          </label>
        </div>

        <div className={styles.buttons}>
          <button onClick={handleSettings}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
