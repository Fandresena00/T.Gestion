/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./UpdateCard.module.css";

export default function UpdateCard({ contextValue }) {
  const { updateCardForm, toggleUpdateCardForm, updateCard, cards } =
    contextValue;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    startDate: "",
    endDate: "",
  });

  // Chargement des données de la carte à modifier
  useEffect(() => {
    if (updateCardForm.cardId) {
      const card = cards.find((c) => c.id === updateCardForm.cardId);
      if (card) {
        setFormData({
          title: card.title,
          description: card.description || "",
          priority: card.priority || "medium",
          startDate: card.startDate || "",
          endDate: card.endDate || "",
        });
      }
    }
  }, [updateCardForm.cardId, cards]);

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      updateCard(updateCardForm.cardId, formData);
    }
  };

  // Fermeture du formulaire si clic en dehors
  const handleContainerClick = (e) => {
    if (e.target.className === styles.container) {
      toggleUpdateCardForm();
    }
  };

  if (!updateCardForm.isVisible) return null;

  return (
    <div className={styles.container} onClick={handleContainerClick}>
      <div className={styles.update_card}>
        <div className={styles.head}>
          <h2>Update card</h2>
          <button
            className={styles.close_button}
            onClick={() => toggleUpdateCardForm()}
          >
            ×
          </button>
        </div>

        <form className={styles.update_form} onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <label>Priority :</label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  priority: e.target.value,
                }))
              }
              className={styles[formData.priority]}
            >
              <option value="important">Important</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className={styles.form_group}>
            <label>Period :</label>
            <div className={styles.date_inputs}>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
              />
              <span>to</span>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className={styles.form_group}>
            <label>Title:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              placeholder="Entrez le titre"
              required
            />
          </div>

          <div className={styles.form_group}>
            <label>Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Entrez la description"
              rows="4"
            />
          </div>

          <div className={styles.button_group}>
            <button type="submit" className={styles.submit_button}>
              Confirmer
            </button>
            <button
              type="button"
              onClick={() => toggleUpdateCardForm()}
              className={styles.cancel_button}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
