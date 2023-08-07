"use client";
import styles from "./page.module.css";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import useSWR from "swr";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    const { data, mutate, error, isLoading } = useSWR(
        // "https://jsonplaceholder.typicode.com/posts",
        // the username is our session user
        `/api/posts?username=${session?.data?.user.name}`,
        fetcher
    );

    console.log(data);

    if (session.status === "loading") {
        return <p>Loading...</p>;
    }

    if (session.status === "unauthenticated") {
        router?.push("/dashboard/login");
    }

    console.log(session);

    // get from mongoose
    // console.log("data: ", data);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = e.target[0].value;
        const desc = e.target[1].value;
        const img = e.target[2].value;
        const content = e.target[3].value;

        try {
            await fetch("/api/posts", {
                method: "POST",
                body: JSON.stringify({
                    title,
                    desc,
                    img,
                    content,
                    username: session.data.user.name,
                }),
            });
            // if we add any data, we can revalidate out data
            mutate();
            // reset all the input when send data
            e.target.reset();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            });

            // mutate when every data is deleted
            mutate();
        } catch (error) {
            console.log(error);
        }
    };

    if (session.status === "authenticated") {
        return (
            <div className={styles.container}>
                <div className={styles.posts}>
                    {isLoading
                        ? "loading"
                        : data?.map((post) => (
                              <div className={styles.post} key={post._id}>
                                  <div className={styles.imgContainer}>
                                      <Image
                                          src={post.img}
                                          alt="img"
                                          width={200}
                                          height={200}
                                      />
                                  </div>
                                  <h2 className={styles.postTitle}>
                                      {post.title}
                                  </h2>
                                  <span
                                      className={styles.delete}
                                      onClick={() => handleDelete(post._id)}
                                  >
                                      X
                                  </span>
                              </div>
                          ))}
                </div>
                <form className={styles.new} onSubmit={handleSubmit}>
                    <h1>Add New Post</h1>
                    <input
                        type="text"
                        placeholder="Title"
                        className={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Desc"
                        className={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Image"
                        className={styles.input}
                    />
                    <textarea
                        className={styles.textArea}
                        placeholder="Content"
                        cols="30"
                        rows="10"
                    >
                        Sends
                    </textarea>
                    <button className={styles.button}>Send</button>
                </form>
            </div>
        );
    }
}

export default DashBoard;
