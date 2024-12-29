"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./map.module.css";
import { Label } from "@/elements/label/Label";
import KakaoMap from "./KaKaoMap";

const App: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState("hospital"); // 기본 선택값: 병원

    return (
        <div>
            <div className={styles.mapHeader}>
                <div
                    className={`${styles.tab} ${
                        selectedTab === "hospital" ? styles.active : ""
                    }`}
                    onClick={() => setSelectedTab("hospital")}
                >
                    <Label text="병원" css="MapLabel" />
                </div>
                <div
                    className={`${styles.tab} ${
                        selectedTab === "pharmacy" ? styles.active : ""
                    }`}
                    onClick={() => setSelectedTab("pharmacy")}
                >
                    <Label text="약국" css="MapLabel" />
                </div>
            </div>
            <KakaoMap />

            {/* <div className={styles.mapList}>
                <div className="horizonFlexbox space-between">
                    <Label text="가람소아과" css="mapList_1" />
                    <Label text="0.13km" css="mapList_1" />
                </div>
                <div className="horizonFlexbox space-between">
                    <Label text="(금) 08:00 ~ 20:00" css="mapList_2" />
                </div>
            </div> */}
        </div>
    );
};

export default App;
