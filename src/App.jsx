import { Route, Routes } from "react-router-dom";
import Interface from "./Pages/Interface";
import Connection from "./Pages/connection/Connection";
import Board from "./Pages/Board";
import { useCallback, useState, useEffect } from "react";

/**
 * Application principale
 * Gère l'état global et la logique métier principale
 */
export default function App() {
  // États principaux de l'application avec persistance localStorage
  const [status, setStatus] = useState(() => {
    const savedStatus = localStorage.getItem("status");
    return savedStatus
      ? JSON.parse(savedStatus)
      : [
          { id: 1001, name: "To Do", order: 1 },
          { id: 1002, name: "Preview", order: 2 },
          { id: 1003, name: "Finish", order: 3 },
        ];
  });

  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem("cards");
    return savedCards ? JSON.parse(savedCards) : [];
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // État pour le formulaire de mise à jour
  const [updateCardForm, setUpdateCardForm] = useState({
    isVisible: false,
    cardId: null,
  });

  // Paramètres globaux
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem("settings");
    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          isVisible: false,
          priority: "medium",
          theme: "light",
          compactView: false,
          cardLimit: 5,
          taskLimit: 10,
          dateAlert: 7,
          autoArchive: false,
          notifications: false,
        };
  });

  // Persistance des données dans localStorage
  useEffect(() => {
    localStorage.setItem("status", JSON.stringify(status));
    localStorage.setItem("cards", JSON.stringify(cards));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [status, cards, tasks, settings]);

  /**
   * Toggle la visibilité des paramètres
   */
  const toggleSettings = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      isVisible: !prev.isVisible,
    }));
  }, []);

  /**
   * Met à jour les paramètres
   */
  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }));
  }, []);

  /**
   * Ajoute un nouveau statut
   */
  const addStatus = useCallback((newStatusName) => {
    if (!newStatusName.trim()) {
      return;
    }

    setStatus((prevStatuses) => {
      if (
        prevStatuses.some(
          (s) => s.name.toLowerCase() === newStatusName.toLowerCase()
        )
      ) {
        return prevStatuses;
      }

      if (prevStatuses.length >= 6) {
        return prevStatuses;
      }

      return [
        ...prevStatuses,
        {
          id: Date.now(),
          name: newStatusName,
          order: prevStatuses.length + 1,
        },
      ];
    });
  }, []);

  /**
   * Ajoute une nouvelle carte
   */
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
          archived: false,
        },
      ]);
    },
    [settings.priority]
  );

  /**
   * Déplace une carte
   */
  const moveCard = useCallback((cardId, newStatusId) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, statusId: newStatusId } : card
      )
    );
  }, []);

  /**
   * Met à jour une carte
   */
  const updateCard = useCallback((cardId, updatedFields) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, ...updatedFields } : card
      )
    );
    setUpdateCardForm({ isVisible: false, cardId: null });
  }, []);

  /**
   * Supprime une carte
   */
  const deleteCard = useCallback((cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    setTasks((prevTasks) => prevTasks.filter((task) => task.cardId !== cardId));
  }, []);

  /**
   * Toggle le formulaire de mise à jour
   */
  const toggleUpdateCardForm = useCallback((cardId = null) => {
    setUpdateCardForm((prev) => ({
      isVisible: !prev.isVisible,
      cardId: cardId || null,
    }));
  }, []);

  /**
   * Ajoute une nouvelle tâche
   */
  const addTask = useCallback((cardId, description) => {
    if (!description.trim()) return;

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

  /**
   * Toggle l'état d'une tâche
   */
  const toggleTask = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  /**
   * Supprime une tâche
   */
  const deleteTask = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  /**
   * Récupère les cartes par statut
   */
  const getCardsByStatus = useCallback(
    (statusId) => {
      return cards.filter(
        (card) => card.statusId === statusId && !card.archived
      );
    },
    [cards]
  );

  /**
   * Récupère les tâches par carte
   */
  const getTasksByCard = useCallback(
    (cardId) => {
      return tasks.filter((task) => task.cardId === cardId);
    },
    [tasks]
  );

  /**
   * Recherche des cartes
   */
  const searchCards = useCallback(
    (searchTerm) => {
      if (!searchTerm.trim()) return [];

      return cards.filter(
        (card) =>
          card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    [cards]
  );

  /**
   * Filtre les cartes
   */
  const filterCards = useCallback(
    (filters) => {
      return cards.filter((card) => {
        if (filters.priority && card.priority !== filters.priority)
          return false;
        if (filters.archived && !card.archived) return false;
        if (filters.dateRange) {
          const cardDate = new Date(card.startDate);
          if (
            cardDate < filters.dateRange.start ||
            cardDate > filters.dateRange.end
          ) {
            return false;
          }
        }
        return true;
      });
    },
    [cards]
  );

  /**
   * Trie les cartes
   */
  const sortCards = useCallback(
    (criterion) => {
      return [...cards].sort((a, b) => {
        switch (criterion) {
          case "title":
            return a.title.localeCompare(b.title);
          case "date":
            return new Date(a.startDate) - new Date(b.startDate);
          case "priority":
            return b.priority.localeCompare(a.priority);
          default:
            return 0;
        }
      });
    },
    [cards]
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
    searchCards,
    filterCards,
    sortCards,
  };

  return (
    <Routes>
      <Route path="dashboard" element={<Board contextValue={contextValue} />} />
      <Route path="connection" element={<Connection />} />
      <Route index element={<Interface contextValue={contextValue} />} />
    </Routes>
  );
}
