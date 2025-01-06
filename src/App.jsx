import { Route, Routes } from "react-router-dom";
import Interface from "./Pages/Interface";
import Connection from "./Pages/connection/Connection";
import { useCallback, useState } from "react";
import Board from "./Pages/Board";

export default function App() {
  // États principaux de l'application
  const [status, setStatuses] = useState([
    { id: 1001, name: "To Do", order: 1 },
    { id: 1002, name: "Preview", order: 2 },
    { id: 1003, name: "Finish", order: 3 },
  ]);
  const [cards, setCards] = useState([]);
  const [tasks, setTasks] = useState([]);
  // État pour gérer le formulaire de mise à jour
  const [updateCardForm, setUpdateCardForm] = useState({
    isVisible: false,
    cardId: null,
  });

  const [settings, setSettings] = useState({
    isVisible: false,
    priority: "medium",
  });

  // ====== Gestionnaires de Status ======
  const addStatus = useCallback((status) => {
    setStatuses((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: status,
        order: prev.length,
      },
    ]);
  }, []);

  // ====== Gestionnaires de Cartes ======
  const addCard = useCallback(
    (
      title,
      statusId,
      description = "",
      priority = settings.priority,
      startDate = new Date().toDateString(),
      endDate = new Date().toDateString()
    ) => {
      setCards((prev) => [
        ...prev,
        {
          id: Date.now(),
          title,
          statusId,
          description,
          priority,
          startDate,
          endDate,
          createdAt: new Date().toLocaleDateString(),
        },
      ]);
    },
    [settings]
  );

  // Fonction pour déplacer une carte entre les statuts
  const moveCard = useCallback((cardId, newStatusId) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, statusId: newStatusId } : card
      )
    );
  }, []);

  // Fonction pour mettre à jour une carte
  const updateCard = useCallback(
    (cardId, { title, description, priority, startDate, endDate }) => {
      setCards((prev) =>
        prev.map((card) =>
          card.id === cardId
            ? {
                ...card,
                title,
                description,
                priority,
                startDate,
                endDate,
              }
            : card
        )
      );
      // Fermer le formulaire après la mise à jour
      setUpdateCardForm({ isVisible: false, cardId: null });
    },
    []
  );

  // Fonction pour supprimer une carte
  const deleteCard = useCallback(
    (cardId) => {
      setCards(cards.filter((card) => card.id !== cardId));
      // Supprime aussi les tâches associées
      setTasks(tasks.filter((task) => task.cardId !== cardId));
    },
    [cards, tasks]
  );

  // Toggle du formulaire de mise à jour
  const toggleUpdateCardForm = useCallback((cardId = null) => {
    setUpdateCardForm((prev) => ({
      isVisible: !prev.isVisible,
      cardId: cardId,
    }));
  }, []);

  // ====== Gestionnaires de Tâches ======
  const addTask = useCallback((cardId, description) => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        cardId,
        description,
        completed: false,
      },
    ]);
  }, []);

  const toggleTask = useCallback((taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback(
    (taskId) => {
      setTasks(tasks.filter((task) => task.id !== taskId));
    },
    [tasks]
  );

  // settings
  const toggleSettings = useCallback(() => {
    setSettings((prev) => ({
      isVisible: !prev.isVisible,
    }));
  }, []);

  const updateSettings = useCallback(({ isVisible = false, priority }) => {
    setSettings({
      isVisible,
      priority: priority,
    });
  }, []);

  // ====== Fonctions utilitaires ======
  const getCardsByStatus = useCallback(
    (statusId) => cards.filter((card) => card.statusId === statusId),
    [cards]
  );

  const getTasksByCard = useCallback(
    (cardId) => tasks.filter((task) => task.cardId === cardId),
    [tasks]
  );

  const contextValue = {
    settings,
    status,
    cards,
    tasks,
    updateCardForm,

    toggleSettings,
    updateSettings,

    // Status
    addStatus,

    // Card
    addCard,
    updateCard,
    moveCard,
    deleteCard,
    toggleUpdateCardForm,

    // Task
    addTask,
    toggleTask,
    deleteTask,

    // Get element filter
    getCardsByStatus,
    getTasksByCard,
  };

  return (
    <Routes>
      <Route path="dashboard" element={<Board contextValue={contextValue} />} />
      <Route path="connection" element={<Connection />} />
      <Route index element={<Interface contextValue={contextValue} />} />
    </Routes>
  );
}
