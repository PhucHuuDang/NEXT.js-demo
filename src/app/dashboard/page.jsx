"use client";
import styles from "./page.module.css";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import useSWR from "swr";
import { useRouter } from "next/navigation";

function DashBoard() {
    // const [data, setData] = useState([]);
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const getData = async () => {
    //         setLoading(true);
    //         const res = await fetch(
    //             "https://jsonplaceholder.typicode.com/posts",
    //             {
    //                 cache: "no-store",
    //             }
    //         );

    //         if (!res.ok) {
    //             throw new Error("Failed to fetch data");
    //         }

    //         const data = await res.json();

    //         setData(data);
    //         setLoading(false);
    //     };
    //     getData();
    // }, []);

    // console.log(data);

    const session = useSession();

    const router = useRouter();

    const fetcher = (...arg) => fetch(...arg).then((res) => res.json());
    const { data, error, loading } = useSWR(
        "https://jsonplaceholder.typicode.com/posts",
        fetcher
    );
    if (session.status === "loading") {
        return <p>Loading...</p>;
    }

    if (session.status === "unauthenticated") {
        router?.push("/dashboard/login");
    }

    console.log(session);

    // get from mongoose
    // console.log("data: ", data);

    if (session.status === "authenticated") {
        return <div className={styles.container}>DashBoard</div>;
    }
}

export default DashBoard;
