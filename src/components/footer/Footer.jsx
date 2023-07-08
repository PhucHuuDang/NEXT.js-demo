"use client";
// use client is want to show up in the UI for use can see

import styles from "./footer.module.css";
import React from "react";
import Image from "next/image";

const Footer = () => {
    console.log("hello");
    return (
        <div className={styles.container}>
            <div>Tex of the Footer</div>
            <div className={styles.social}>
                <Image
                    src="/1.png"
                    alt="facebook"
                    width={15}
                    height={15}
                    alt="facebook"
                    className={styles.icon}
                />
                <Image
                    src="/2.png"
                    alt="instagram"
                    width={15}
                    height={15}
                    alt="instagram"
                    className={styles.icon}
                />
                <Image
                    src="/3.png"
                    alt="twitter"
                    width={15}
                    height={15}
                    alt="twitter"
                    className={styles.icon}
                />
                <Image
                    src="/4.png"
                    alt="youtube"
                    width={15}
                    height={15}
                    alt="youtube"
                    className={styles.icon}
                />
            </div>
        </div>
    );
};

export default Footer;
