import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Hero from "public/hero.png";
import Button from "@/components/Button/Button";
const Home = () => {
    return (
        <div className={styles.container}>
            {/* <Image
                src="https://images.pexels.com/photos/908714/pexels-photo-908714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                width={500}
                height={500}
                className={styles.img}
                alt=""
            /> */}
            <div className={styles.item}>
                <h1 className={styles.title}>
                    Better design for your digital products
                </h1>
                <p className={styles.desc}>
                    Turning your idea into reality. We bring together the teams
                    from the global tech industry
                </p>
                <Button url="/portfolio" text="See Our Work" />
            </div>
            <div className={styles.item}>
                <Image src={Hero} alt="" className={styles.img} />
            </div>
        </div>
    );
};

export default Home;
