import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import styles from "./SplashPage.module.css";

function SplashPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  let [credential, setCredential] = useState("");
  let [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/notes" />;

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

  const onDemo = async (e) => {
    e.preventDefault();
    credential = "Demo-User"
    password = "password"
    const data = await dispatch(sessionActions.login({ credential, password}));
  };

  return (
    <div>
      <div className={styles.flexDiv}>
        <div className={styles.leftContainer}>
          <h1 className={styles.welcome}>ForeverNotes</h1>
          <p className={styles.description}>Take notes with ForeverNotes.</p>
        </div>
        <div className={styles.rightContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <ul className={styles.errors}>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <div className={styles.formContainer}>
              <label>
                <div>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Email or Username"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                  />
                </div>
              </label>
            </div>
            <div className={styles.formContainer}>
              <label>
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
            <div className={styles.submitContainer}>
              <button type="submit" className={styles.submitButton}>
                Log In
              </button>
            </div>
          </form>
          <form className={styles.submitContainer} onSubmit={onDemo}>
            <button className={styles.submitButton} type="submit">
              Demo Login
            </button>
          </form>
          <div className={styles.line}></div>
          <div className={styles.formContainer}>
            <NavLink to="/signup">
              <button className={styles.submitButton}>
                Go to Sign up Page
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <footer className={styles.footer}></footer>
    </div>
  );
}

export default SplashPage;
