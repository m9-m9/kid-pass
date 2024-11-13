import React, { useEffect, useRef, useState } from "react";

const Map: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null); // 지도 DOM 참조
    const [hospitalCount, setHospitalCount] = useState<number>(0); // 병원 수 상태

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
                        level: 3, // 확대 수준
                    };

                    // 지도 생성
                    const map = new kakao.maps.Map(mapRef.current, options);

                    // 장소 검색 객체 생성
                    const places = new kakao.maps.services.Places();

                    // 카테고리 검색: 병원 (HP8)
                    places.categorySearch(
                        "HP8",
                        (result: any, status: any) => {
                            if (status === kakao.maps.services.Status.OK) {
                                // 병원 수 업데이트
                                setHospitalCount(result.length);

                                // 결과를 지도에 마커로 표시
                                result.forEach((place: any) => {
                                    displayMarker(map, place);
                                });
                            } else {
                                console.error("Failed to fetch hospital data");
                            }
                        },
                        {
                            location: new kakao.maps.LatLng(
                                latitude,
                                longitude,
                            ), // 현재 위치 기반 검색
                        },
                    );
                }
            });
        };

        const displayMarker = (map: any, place: any) => {
            const kakao = (window as any).kakao;

            // 마커 생성
            const marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x), // 장소 좌표
            });

            // 정보창 생성
            const infowindow = new kakao.maps.InfoWindow({
                content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
                zIndex: 1,
            });

            // 마커 클릭 이벤트 등록
            kakao.maps.event.addListener(marker, "click", () => {
                infowindow.open(map, marker); // 마커 클릭 시 정보창 열기
            });
        };

        const getCurrentPosition = () => {
            // 브라우저 위치 정보 가져오기
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        initializeMap(latitude, longitude); // 현재 위치를 중심으로 지도 초기화
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                        initializeMap(37.5665, 126.978); // 기본값: 서울 시청 좌표
                    },
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
                initializeMap(37.5665, 126.978); // 기본값: 서울 시청 좌표
            }
        };

        loadKakaoMapScript().then(() => getCurrentPosition());
    }, []);

    return (
        <div>
            <h1>맵 컴포넌트</h1>
            <p>검색된 병원의 개수: {hospitalCount}개</p>
            <div
                ref={mapRef}
                style={{
                    width: "100%", // 화면 가득 너비
                    height: "auto", // 높이 자동
                    aspectRatio: "16 / 9", // 16:9 비율 유지
                }}
            />
        </div>
    );
};

export default Map;
