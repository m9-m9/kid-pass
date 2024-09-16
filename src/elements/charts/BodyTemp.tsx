import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const data = [
    { date: "어제", temp: 36.5 },
    { date: "오늘", temp: 37.5 },
    { date: "내일", temp: 38.3 },
];

const BodyTemp = () => (
    <LineChart
        width={400}
        height={150}
        data={data}
        margin={{ top: 10, right: 30, left: 30 }} // top 마진을 늘려 X축을 더 위로 이동
    >
        <XAxis
            dataKey="date"
            orientation="top"
            axisLine={false} // X축 라인 제거
            tickLine={false} // 틱 마크 제거
            tick={{ dy: -10 }} // 텍스트를 더 위로 이동 (dy 값을 더 키우면 더 올라감)
        />
        <YAxis
            domain={[36, 39.5]} // Y축의 범위를 36에서 39로 설정
            tickCount={10} // 자동으로 10개의 틱을 설정
            hide={true} // Y축 숨기기
        />
        <Tooltip />
        <Line
            type="monotone"
            dataKey="temp"
            stroke="#ccc"
            dot={{ r: 6 }} // 각 점에 대한 크기 설정
            label={{ position: "top", dy: -10 }}
        />
    </LineChart>
);

export default BodyTemp;
