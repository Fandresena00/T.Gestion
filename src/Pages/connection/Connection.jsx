import styles from "./Connection.module.css";

export default function Connection() {
  return (
    <div className={styles.container}>
      <div className={styles.connect_board}>
        <h3>Login</h3>
        <div className={styles.input}>
          <h4 className={styles.input_holder}>e-mail</h4>
          <input
            autoFocus
            required
            type="email"
            name="email"
            id="email"
            className={styles.input_data}
          />
        </div>
        <div className={styles.input}>
          <h4 className={styles.input_holder}>Password</h4>
          <input
            required
            type="password"
            name="password"
            id="password"
            className={styles.input_data}
          />
          <button className={styles.connect}>Login</button>
        </div>

        <p className={styles.change}>
          You don&apos;t have an account ?&nbsp;
          <button>Sign In</button>
        </p>
      </div>
    </div>
  );
}
