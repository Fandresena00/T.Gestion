import styles from "./Team.module.css";

export default function Team() {
  return (
    <div className={styles.container}>
      <div className={styles.team_name}>
        <svg viewBox="0 0 24 24">
          <path d="M2 16.667a2.667 2.667 0 0 1 2.667 -2.667h2.666a2.667 2.667 0 0 1 2.667 2.667v2.666a2.667 2.667 0 0 1 -2.667 2.667h-2.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
          <path d="M14 16.667a2.667 2.667 0 0 1 2.667 -2.667h2.666a2.667 2.667 0 0 1 2.667 2.667v2.666a2.667 2.667 0 0 1 -2.667 2.667h-2.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
          <path d="M8 4.667a2.667 2.667 0 0 1 2.667 -2.667h2.666a2.667 2.667 0 0 1 2.667 2.667v2.666a2.667 2.667 0 0 1 -2.667 2.667h-2.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
          <path d="M12 8a1 1 0 0 0 -1 1v2h-3c-1.645 0 -3 1.355 -3 3v1a1 1 0 0 0 1 1a1 1 0 0 0 1 -1v-1c0 -.564 .436 -1 1 -1h8c.564 0 1 .436 1 1v1a1 1 0 0 0 1 1a1 1 0 0 0 1 -1v-1c0 -1.645 -1.355 -3 -3 -3h-3v-2a1 1 0 0 0 -1 -1z" />
        </svg>
        <h2>Team name</h2>
      </div>
      <div className={styles.team_board}>
        <h4>team members</h4>
        <ul className={styles.team_list}>
          <li>
            <img src="/src/assets/react.svg" alt="profil image" />
            <h5>krai andrey</h5>
          </li>
          <li>
            <img src="/src/assets/react.svg" alt="profil image" />
            <h5>silphy</h5>
          </li>
          <li>
            <img src="/src/assets/react.svg" alt="profil image" />
            <h5>ark</h5>
          </li>
        </ul>
        <button className={styles.add}>add members</button>
      </div>
    </div>
  );
}
