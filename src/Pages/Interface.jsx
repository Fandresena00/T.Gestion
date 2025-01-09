import { useCallback, useEffect, useState } from "react";
import Header from "../components/interface/header/Header";
import Table from "../components/interface/table/Table";

export default function Interface() {
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

  const [updateCardForm, setUpdateCardForm] = useState({
    isVisible: false,
    cardId: null,
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

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

  // ====================== Persistance des données dans localStorage =================== //
  useEffect(() => {
    localStorage.setItem("status", JSON.stringify(status));
    localStorage.setItem("cards", JSON.stringify(cards));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [status, cards, tasks, settings]);

  // ========================================================= Settings ================================================================ //
  const toggleSettings = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      isVisible: !prev.isVisible,
    }));
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }));
  }, []);

  // =========================================================== Status ===================================================================== //
  const addStatus = useCallback((newStatusName) => {
    if (!newStatusName.trim()) {
      return;
    }

    setStatus((prevStatuses) => {
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

  const deleteStatus = useCallback((statusId) => {
    setCards((prevCards) =>
      prevCards.filter((card) => card.statusId !== statusId)
    );
    setStatus((prevStatus) => prevStatus.filter((s) => s.id !== statusId));
  }, []);

  // ============================================= Card ============================================= //
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

  const moveCard = useCallback((cardId, newStatusId) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, statusId: newStatusId } : card
      )
    );
  }, []);

  const updateCard = useCallback((cardId, updatedFields) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, ...updatedFields } : card
      )
    );
    setUpdateCardForm({ isVisible: false, cardId: null });
  }, []);

  const deleteCard = useCallback((cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    setTasks((prevTasks) => prevTasks.filter((task) => task.cardId !== cardId));
  }, []);

  const toggleUpdateCardForm = useCallback((cardId = null) => {
    setUpdateCardForm((prev) => ({
      isVisible: !prev.isVisible,
      cardId: cardId || null,
    }));
  }, []);

  // ========================================== Task ==================================================== //
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

  const toggleTask = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  // ============================================================== Get function ========================================================= //
  const getCardsByStatus = useCallback(
    (statusId) => {
      return cards.filter(
        (card) => card.statusId === statusId && !card.archived
      );
    },
    [cards]
  );

  const getTasksByCard = useCallback(
    (cardId) => {
      return tasks.filter((task) => task.cardId === cardId);
    },
    [tasks]
  );

  // ========================================================= search , filter and sort function for UI ============================================================= //
  const searchCards = useCallback(
    (searchTerm) => {
      if (!searchTerm.trim()) return cards;

      return cards.filter(
        (card) =>
          card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    [cards]
  );

  const filterCards = useCallback(
    (filters) => {
      return cards.filter((card) => {
        if (filters.priority && card.priority !== filters.priority)
          return false;
        if (filters.archived && !card.archived) return false;
        if (filters.dateRange) {
          const cardDate = new Date(card.startDate);
          if (
            cardDate < new Date(filters.dateRange.start) ||
            cardDate > new Date(filters.dateRange.end)
          ) {
            return false;
          }
        }
        return true;
      });
    },
    [cards]
  );

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

  // =========================== context value ========================= //

  const contextValue = {
    settings,
    status,
    cards,
    tasks,
    updateCardForm,

    // settings
    toggleSettings,
    updateSettings,

    // status
    addStatus,
    deleteStatus,

    // card
    addCard,
    updateCard,
    moveCard,
    deleteCard,
    toggleUpdateCardForm,

    // task
    addTask,
    toggleTask,
    deleteTask,

    // get Id
    getCardsByStatus,
    getTasksByCard,

    // additional
    searchCards,
    filterCards,
    sortCards,
  };

  return (
    <div className="interface">
      <Header contextValue={contextValue} />
      <Table contextValue={contextValue} />
    </div>
  );
}
