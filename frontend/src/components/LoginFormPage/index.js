import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import styles from "./LoginForm.module.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <ul className={styles.errors}>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className={styles.formContainer}>
          <label>
            Username or Email
            <div>
              <input
                className={styles.input}
                type="text"
                placeholder="Username or Email"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </div>
          </label>
        </div>
        <div className={styles.formContainer}>
          <label>
            Password
            <div>
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </label>
        </div>
        <div className={styles.formContainer}>
          <button type="submit" className={styles.submitButton}>Log In</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
