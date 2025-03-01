import { Carousel } from "@mantine/carousel";
import { Box } from "@mantine/core";

export default function WeeklyDatePicker() {
  return (
    <Box style={{ width: "100%", overflow: "hidden", padding: "0 15px" }}>
      <Carousel
        styles={{
          container: {
            display: "flex",
          },
          viewport: {
            overflow: "hidden",
          },
          slide: {
            marginRight: "10px", // 슬라이드 간 간격 추가
          },
        }}
        withControls={false}
        withIndicators={false}
        height={200}
        slideSize="100%" // 슬라이드 크기를 100%로 설정
        align="center"
        loop
        slidesToScroll={1} // 한 번에 한 슬라이드씩 스크롤
      >
        <Carousel.Slide
          style={{
            backgroundColor: "#f0f0f0",
            borderRadius: "8px", // 모서리 둥글게
            padding: "15px", // 내부 여백
          }}
        >
          11111111111111
        </Carousel.Slide>
        <Carousel.Slide
          style={{
            backgroundColor: "#e0e0e0",
            borderRadius: "8px",
            padding: "15px",
          }}
        >
          22222222222222
        </Carousel.Slide>
        <Carousel.Slide
          style={{
            backgroundColor: "#d0d0d0",
            borderRadius: "8px",
            padding: "15px",
          }}
        >
          33333333333333
        </Carousel.Slide>
        <Carousel.Slide
          style={{
            backgroundColor: "#c0c0c0",
            borderRadius: "8px",
            padding: "15px",
          }}
        >
          44444444444444
        </Carousel.Slide>
        <Carousel.Slide
          style={{
            backgroundColor: "#b0b0b0",
            borderRadius: "8px",
            padding: "15px",
          }}
        >
          55555555555555
        </Carousel.Slide>
      </Carousel>
    </Box>
  );
}
