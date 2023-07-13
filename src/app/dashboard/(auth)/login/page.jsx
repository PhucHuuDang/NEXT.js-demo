"use client";

import { signIn } from "next-auth/react";
import styles from "./page.module.css";

function Login() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;

        signIn("credentials", { email, password });
    };
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    className={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    className={styles.input}
                    required
                />
                <button className={styles.button}>Login</button>
                {/* {error && "Something went wrong"} */}
            </form>
            <button onClick={() => signIn("google")}>Login with Google</button>
        </div>
    );
}

export default Login;
