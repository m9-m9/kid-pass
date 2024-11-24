"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./map.module.css";
import { Label } from "@/elements/label/Label";

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null); // 지도 DOM 참조
  const [selectedTab, setSelectedTab] = useState("hospital"); // 기본 선택값: 병원

  useEffect(() => {
    // 스크립트 동적 로드
    const loadKakaoMapScript = () => {
      return new Promise<void>((resolve) => {
        if (document.getElementById("kakao-map-script")) {
          resolve(); // 이미 스크립트가 로드된 경우
          return;
        }

        const script = document.createElement("script");
        script.id = "kakao-map-script";
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
          import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY
        }&libraries=services&autoload=false`; // services 라이브러리 추가
        script.onload = () => resolve(); // 스크립트 로드 후 resolve
        document.head.appendChild(script);
      });
    };

    const initializeMap = (latitude: number, longitude: number) => {
      const kakao = (window as any).kakao;

      kakao.maps.load(() => {
        if (mapRef.current) {
          const options = {
            center: new kakao.maps.LatLng(latitude, longitude), // 현재 위치
            level: 5, // 확대 수준
          };

          // 지도 생성
          new kakao.maps.Map(mapRef.current, options);
        }
      });
    };

    const getCurrentPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            initializeMap(latitude, longitude); // 현재 위치를 중심으로 지도 초기화
          },
          (error) => {
            console.error("Error getting location:", error);
            initializeMap(37.5665, 126.978); // 기본값: 서울 시청 좌표
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        initializeMap(37.5665, 126.978);
      }
    };

    loadKakaoMapScript().then(() => getCurrentPosition());
  }, []);

  return (
    <div>
      <div className={styles.mapHeader}>
        <div
          className={`${styles.tab} ${selectedTab === "hospital" ? styles.active : ""}`}
          onClick={() => setSelectedTab("hospital")}
        >
          <Label text="병원" css="MapLabel" />
        </div>
        <div
          className={`${styles.tab} ${selectedTab === "pharmacy" ? styles.active : ""}`}
          onClick={() => setSelectedTab("pharmacy")}
        >
          <Label text="약국" css="MapLabel" />
        </div>
      </div>
      <div
        ref={mapRef}
        style={{
          width: "100%", // 화면 가득 너비
          height: "auto", // 높이 자동
          aspectRatio: "16 / 9", // 16:9 비율 유지
        }}
      />
      <div className={styles.mapList}>
        <div className="horizonFlexbox space-between">
          <Label text="가람소아과" css="mapList_1" />
          <Label text="0.13km" css="mapList_1" />
        </div>
        <div className="horizonFlexbox space-between">
          <Label text="(금) 08:00 ~ 20:00" css="mapList_2" />
        </div>
      </div>
      <div className={styles.mapList}>
        <div className="horizonFlexbox space-between">
          <Label text="가람소아과" css="mapList_1" />
          <Label text="0.13km" css="mapList_1" />
        </div>
        <div className="horizonFlexbox space-between">
          <Label text="(금) 08:00 ~ 20:00" css="mapList_2" />
        </div>
      </div>
    </div>
  );
};

export default Map;
