/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./Card.module.css";
import Task from "../task/Task";

/**
 * Composant de carte
 * Affiche une carte avec ses tâches et gère les interactions
 */
export default function Card({ card, contextValue }) {
  const {
    deleteCard,
    archiveCard,
    getTasksByCard,
    addTask,
    toggleUpdateCardForm,
    settings,
  } = contextValue;

  const tasks = getTasksByCard(card.id);
  const [newTask, setNewTask] = useState("");
  const [isNearDeadline, setIsNearDeadline] = useState(false);

  // Vérifie si la date limite approche
  useEffect(() => {
    const endDate = new Date(card.endDate);
    const today = new Date();
    const daysUntilEnd = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
    setIsNearDeadline(daysUntilEnd <= settings.dateAlert);
  }, [card.endDate, settings.dateAlert]);

  /**
   * Gère l'ajout d'une nouvelle tâche
   * @param {Event} e - Événement de formulaire
   */
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    if (tasks.length >= settings.taskLimit) {
      alert(`Maximum task limit (${settings.taskLimit}) reached for this card`);
      return;
    }

    addTask(card.id, newTask);
    setNewTask("");
  };

  /**
   * Gère la suppression de la carte
   * @param {Event} e - Événement de clic
   */
  const handleDelete = (e) => {
    e.stopPropagation();
    deleteCard(card.id);
  };

  /**
   * Gère l'archivage de la carte
   * @param {Event} e - Événement de clic
   */
  const handleArchive = (e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to archive this card?")) {
      archiveCard(card.id);
    }
  };

  // Gestion du drag and drop
  const handleDragStart = (e) => {
    e.dataTransfer.setData("cardId", card.id.toString());
    e.currentTarget.classList.add(styles.dragging);
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove(styles.dragging);
  };

  /**
   * Ouvre le formulaire de mise à jour
   * @param {Event} e - Événement de clic
   */
  const handleUpdateClick = (e) => {
    e.stopPropagation();
    toggleUpdateCardForm(card.id);
  };

  return (
    <div
      className={`${styles.task_card} ${
        isNearDeadline ? styles.near_deadline : ""
      }`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.title}>
        <h6 className={styles[card.priority]}>{card.priority}</h6>
        <div className={styles.icon}>
          <button onClick={handleArchive} className={styles.archive}>
            <svg viewBox="0 0 24 24">
              <path d="M3 3h18v18H3V3zm1 1v16h16V4H4zm4 3h8v2H8V7zm0 4h8v2H8v-2zm0 4h4v2H8v-2z" />
            </svg>
          </button>
          <button onClick={handleUpdateClick} className={styles.update}>
            <svg viewBox="0 0 24 24">
              <path d="M8 9.585v6.415h6.414l-2.707 2.707a1 1 0 0 1 -.112 .097l-.11 .071l-.114 .054l-.105 .035l-.149 .03l-.117 .006h-4.586l-1.707 1.707a1 1 0 1 1 -1.414 -1.414l1.707 -1.709v-4.584l.003 -.075l.017 -.126l.03 -.111l.044 -.111l.052 -.098l.067 -.096l.08 -.09z" />
              <path d="M19.414 11l-3 3h-4.914l2.914 -3z" />
              <path d="M13 4.586v4.998l-3 3v-4.999z" />
              <path d="M16.482 3a4.515 4.515 0 0 1 4.518 4.514a4.7 4.7 0 0 1 -.239 1.487l-5.761 -.001v-5.76c.469 -.158 .968 -.24 1.482 -.24" />
            </svg>
          </button>
          <button onClick={handleDelete} className={styles.delete}>
            <svg viewBox="0 0 24 24">
              <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" />
              <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" />
            </svg>
          </button>
        </div>

        <details className={styles.details}>
          <summary>{card.title}</summary>
          <div className={styles.card_info}>
            <p className={styles.date}>
              <span className={isNearDeadline ? styles.warning : ""}>
                {card.startDate} - {card.endDate}
              </span>
            </p>
            <p className={styles.description}>{card.description}</p>
            {isNearDeadline && (
              <p className={styles.deadline_warning}>
                This card is near its deadline!
              </p>
            )}
          </div>
        </details>
      </div>

      <div className={styles.task}>
        <ul>
          {tasks.map((task) => (
            <Task key={task.id} task={task} contextValue={contextValue} />
          ))}
          {tasks.length < settings.taskLimit && (
            <form onSubmit={handleAddTask}>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add task"
                className={styles.input_button}
                maxLength={50}
              />
            </form>
          )}
        </ul>
        <div className={styles.task_count}>
          {tasks.length} / {settings.taskLimit} tasks
        </div>
      </div>
    </div>
  );
}
