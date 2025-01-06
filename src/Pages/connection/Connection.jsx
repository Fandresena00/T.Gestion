import { useState } from "react";
import styles from "./Connection.module.css";

export default function Connection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.connect_board}>
        <h3>Login</h3>
        <form action="">
          <div className={styles.input}>
            <input
              autoFocus
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value.replace(/\s/g, ""));
              }}
              type="email"
              name="email"
              id="email"
              className={styles.input_data}
            />
            <h4
              className={`${styles.input_holder} ${
                email.length > 0 && styles.content
              }`}
            >
              e-mail
            </h4>
          </div>
          <div className={styles.input}>
            <input
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value.replace(/\s/g, ""));
              }}
              type="password"
              name="password"
              id="password"
              className={styles.input_data}
            />
            <h4
              className={`${styles.input_holder} ${
                password.length > 0 && styles.content
              }`}
            >
              Password
            </h4>
          </div>
          <button className={styles.connect}>Login</button>
        </form>

        <p className={styles.change}>
          You don&apos;t have an account ?&nbsp;
          <button>Sign In</button>
        </p>
      </div>
    </div>
  );
}
