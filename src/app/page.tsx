"use client";

import React from "react";
import styles from "./page.module.css";

import Info from "@/components/info";
import Map from "@/components/map";

import temp from "@/actions/temp";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Add Material UI Drawer on the left side with Apply button to close*/}
      {/* <section className={styles.info}>
        <h1>Quest for Azrael Interactive Map</h1>
        <Info />
      </section>
      <section className={styles.map}>
        <Map />
      </section> */}
      <button onClick={async () => await temp()}>Save into Mongo</button>
    </main>
  );
}
