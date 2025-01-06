/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./UpdateCard.module.css";

/**
 * Composant de formulaire de mise à jour de carte
 * Permet de modifier les détails d'une carte existante
 */
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
  const [errors, setErrors] = useState({});

  // Charge les données de la carte à modifier
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

  /**
   * Valide le formulaire
   * @returns {boolean} - True si le formulaire est valide
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.dates = "End date cannot be before start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Gère la soumission du formulaire
   * @param {Event} e - Événement de formulaire
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        updateCard(updateCardForm.cardId, formData);
      } catch (error) {
        setErrors({ submit: error.message });
      }
    }
  };

  // Ferme le formulaire si clic en dehors
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
          <h2>Update Card</h2>
          <button
            className={styles.close_button}
            onClick={() => toggleUpdateCardForm()}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form className={styles.update_form} onSubmit={handleSubmit}>
          {errors.submit && (
            <div className={styles.error_message}>{errors.submit}</div>
          )}

          <div className={styles.form_group}>
            <label>Priority:</label>
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
            <label>Period:</label>
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
            {errors.dates && (
              <div className={styles.error_message}>{errors.dates}</div>
            )}
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
              placeholder="Enter title"
              maxLength={100}
              required
            />
            {errors.title && (
              <div className={styles.error_message}>{errors.title}</div>
            )}
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
              placeholder="Enter description"
              rows="4"
              maxLength={500}
            />
          </div>

          <div className={styles.button_group}>
            <button type="submit" className={styles.submit_button}>
              Confirm
            </button>
            <button
              type="button"
              onClick={() => toggleUpdateCardForm()}
              className={styles.cancel_button}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
