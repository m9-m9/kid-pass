"use client";
import { Map, useKakaoLoader } from "react-kakao-maps-sdk";
import React from "react";

const KakaoMap = () => {
    const [loading] = useKakaoLoader({
        appkey: "e6b8e90e2018f56090316a82ae7588f2",
    });

    if (loading) return <div>Loading...</div>;

    return (
        <Map
            center={{ lat: 33.450701, lng: 126.570667 }}
            style={{ width: "100%", height: "450px" }}
            level={3}
        />
    );
};

export default KakaoMap;
