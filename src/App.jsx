import { Route, Routes } from "react-router-dom";
import Interface from "./Pages/Interface";
import Connection from "./Pages/connection/Connection";
import Board from "./Pages/Board";
import { useCallback, useState } from "react";

export default function App() {
  // Main states of the application
  const [status, setStatus] = useState([
    { id: 1001, name: "To Do", order: 1 },
    { id: 1002, name: "Preview", order: 2 },
    { id: 1003, name: "Finish", order: 3 },
  ]);
  const [cards, setCards] = useState([]);
  const [tasks, setTasks] = useState([]);

  // State for managing the update form
  const [updateCardForm, setUpdateCardForm] = useState({
    isVisible: false,
    cardId: null,
  });

  const [settings, setSettings] = useState({
    isVisible: false,
    priority: "medium",
  });

  // Callback for adding a new status
  const addStatus = useCallback((newStatusName) => {
    setStatus((prevStatuses) => [
      ...prevStatuses,
      {
        id: Date.now(),
        name: newStatusName,
        order: prevStatuses.length + 1,
      },
    ]);
  }, []);

  // Callback for adding a new card
  const addCard = useCallback(
    (
      title,
      statusId,
      description = "",
      priority = settings.priority,
      startDate = new Date().toLocaleDateString(),
      endDate = new Date().toLocaleDateString()
    ) => {
      setCards((prevCards) => [
        ...prevCards,
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
    [settings.priority]
  );

  // Callback for moving a card to a new status
  const moveCard = useCallback((cardId, newStatusId) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, statusId: newStatusId } : card
      )
    );
  }, []);

  // Callback for updating a card
  const updateCard = useCallback((cardId, updatedFields) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, ...updatedFields } : card
      )
    );
    setUpdateCardForm({ isVisible: false, cardId: null });
  }, []);

  // Callback for deleting a card
  const deleteCard = useCallback((cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    setTasks((prevTasks) => prevTasks.filter((task) => task.cardId !== cardId));
  }, []);

  // Toggle the update card form visibility
  const toggleUpdateCardForm = useCallback((cardId = null) => {
    setUpdateCardForm((prev) => ({
      isVisible: !prev.isVisible,
      cardId: cardId || null,
    }));
  }, []);

  // Callback for adding a new task
  const addTask = useCallback((cardId, description) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now(),
        cardId,
        description,
        completed: false,
      },
    ]);
  }, []);

  // Callback for toggling task completion
  const toggleTask = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  // Callback for deleting a task
  const deleteTask = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  // Toggle settings visibility
  const toggleSettings = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      isVisible: !prev.isVisible,
    }));
  }, []);

  // Update settings
  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }));
  }, []);

  // Utility function to get cards by status
  const getCardsByStatus = useCallback(
    (statusId) => cards.filter((card) => card.statusId === statusId),
    [cards]
  );

  // Utility function to get tasks by card
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

    addStatus,

    addCard,
    updateCard,
    moveCard,
    deleteCard,
    toggleUpdateCardForm,

    addTask,
    toggleTask,
    deleteTask,

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
