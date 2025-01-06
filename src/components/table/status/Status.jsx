/* eslint-disable react/prop-types */
import { useState } from "react";
import Card from "../card/Card";
import styles from "./Status.module.css";

export default function Status({ status, contextValue }) {
  const { getCardsByStatus, addCard } = contextValue;
  const cards = getCardsByStatus(status.id);
  const [newCard, setNewCard] = useState("");

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
      <div>
        <h4>{status.name}</h4>
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
          <form onSubmit={handleAddCard}>
            <input
              type="text"
              value={newCard}
              onChange={(e) => setNewCard(e.target.value)}
              placeholder="new card"
              className={styles.input_button}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
