/* eslint-disable react/prop-types */
import { useState } from "react";
import Card from "../card/Card";
import styles from "./Status.module.css";

export default function Status({ status, contextValue }) {
  const { getCardsByStatus, addCard, deleteStatus, settings } = contextValue;
  const cards = getCardsByStatus(status.id);
  const [newCard, setNewCard] = useState("");

  const HandleDeleteStatus = () => {
    deleteStatus(status.id);
  };

  // Gestion de l'ajout d'une nouvelle carte
  const handleAddCard = (e) => {
    e.preventDefault();
    if (newCard.trim()) {
      addCard(newCard, status.id);
      setNewCard("");
    }
  };

  // Gestionnaires pour le drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add(styles.drag_over);
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove(styles.drag_over);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove(styles.drag_over);
    const cardId = parseInt(e.dataTransfer.getData("cardId"));
    if (cardId) {
      contextValue.moveCard(cardId, status.id);
    }
  };

  return (
    <div className={styles.status}>
      <div className={styles.status_info}>
        <h4>{status.name}</h4>
        <button onClick={HandleDeleteStatus}>
          <svg viewBox="0 0 24 24">
            <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
            <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" />
          </svg>
        </button>
      </div>
      <div className={styles.container}>
        <div
          className={styles.task_container}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          {/* Liste des cartes */}
          {cards.map((card) => (
            <Card key={card.id} card={card} contextValue={contextValue} />
          ))}
          {cards.length < settings.cardLimit && (
            <form onSubmit={handleAddCard}>
              <input
                type="text"
                value={newCard}
                onChange={(e) => setNewCard(e.target.value)}
                placeholder="new card"
                className={styles.input_button}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
