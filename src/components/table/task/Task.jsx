/* eslint-disable react/prop-types */
import styles from "./Task.module.css";

export default function Task({ task, contextValue }) {
  const { toggleTask, deleteTask } = contextValue;

  const HandleDeleteTask = () => {
    deleteTask(task.id);
  };

  return (
    <li
      className={`${styles.check_task} ${
        task.completed ? styles.completed_color : ""
      }`}
    >
      <label className={styles.custom_checkbox}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <span className={styles.checkmark}></span>
      </label>
      &nbsp;&nbsp;{" "}
      <span className={task.completed ? `${styles.completed}` : ""}>
        {task.description}
      </span>
      <button onClick={HandleDeleteTask} className={styles.delete}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M10 10l4 4m0 -4l-4 4" />
        </svg>
      </button>
    </li>
  );
}
