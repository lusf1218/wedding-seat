"use client";

import { useState } from "react";

// ✅ 已依你提供的 Excel「完整補齊 1–26 桌」
// 規則：去除 *2、*3、+1小 等標註，每一位姓名只對應一桌
const seatingData = {
  // 1 桌
  "樂": "1", "樂爸": "1", "樂媽": "1", "樂奶": "1", "樂舅": "1", "樂舅媽": "1",
  "勳": "1", "勳爸": "1", "勳媽": "1", "勳二舅": "1", "勳二舅媽": "1", "勳大姑": "1",

  // 2 桌
  "爺": "2", "霖叔": "2", "姑": "2", "雙": "2", "大舅爺爺": "2", "小舅爺爺": "2",

  // 3 桌
  "鍾文達": "3", "陳威良": "3", "張啟誠": "3", "陳品豪": "3", "林格州": "3",

  // 4 桌
  "林文廷": "4", "張文杰": "4", "張金財": "4", "徐國揚": "4", "魏凱薰": "4", "陳欣伶": "4",

  // 5 桌
  "謝老闆": "5", "沈老闆": "5", "王老闆": "5", "東東": "5", "成船長": "5",

  // 6 桌
  "婆婆": "6", "皮皮": "6", "大阿姨": "6", "舅爺爺": "6", "魏淑華": "6", "二阿姨": "6", "魏茂春": "6", "阿娟阿姨": "6",

  // 7 桌
  "劉彥騰": "7", "劉宜榛": "7", "魏麗霜": "7", "魏秀姍": "7",

  // 8 桌
  "魏梓洋": "8", "魏健華": "8", "魏妏伶": "8", "萬駿騰": "8", "萬昱廷": "8", "陸霆希": "8", "陳冠廷": "8", "陳妍熙": "8",

  // 9 桌
  "楊涵鈺": "9", "邱奕綺": "9", "周宛儀": "9", "江雨軒": "9", "翁淑文": "9", "謝宜庭": "9", "龔佩珏": "9", "陳奕璇": "9",

  // 10 桌
  "林子琪": "10", "陸思穎": "10", "柯佩妤": "10", "林政寬": "10", "溫俊維": "10", "林彥廷": "10", "黃思婷": "10", "賈婷之": "10", "滾窚瑋": "10",

  // 11 桌
  "廖千儀": "11", "林承暘": "11", "戴維文": "11", "許進發": "11", "葉品寬": "11", "李睿韜": "11",

  // 12 桌
  "辜昱維": "12", "賴禹璇": "12", "林軒丞": "12", "呂宜庭": "12", "許智斌": "12", "顏琮翰": "12", "張家榕": "12", "范銘澄": "12",

  // 13 桌
  "吳惠庭": "13", "張祐萍": "13", "周台興": "13", "王宇琦": "13", "周名倫": "13", "桂璿": "13",

  // 14 桌
  "陳熙": "14", "陳力鳳": "14", "范丞緯": "14", "陳惠芳": "14", "林蔓臻": "14", "林辰縈": "14",

  // 15 桌
  "陳肜羽": "15", "陳宏美": "15", "呂采霓": "15", "戴良諭": "15", "林語琦": "15", "蔡宜岑": "15",

  // 16 桌
  "趙一驎": "16", "黃靖博": "16", "陳明坤": "16", "夏定楠": "16", "陳俊霖": "16", "許凱智": "16", "張祐銘": "16",

  // 17 桌
  "吳祚華": "17", "吳沛宸": "17", "曾璽宏": "17", "李宗穎": "17", "丁乾耀": "17", "尹聖凱": "17", "楊人懿": "17", "吳泓儒": "17",

  // 18 桌
  "邱晨光": "18", "鄭鈞燦": "18", "孫韶甫": "18", "洪國靖": "18", "童煒傑": "18", "邱聖傑": "18", "林哲緯": "18",

  // 19 桌
  "劉柏輝": "19", "楊杰穎": "19", "許秩華": "19", "丁彥騰": "19",

  // 20 桌
  "廖友茂": "20", "陳清大": "20", "洪偉倫": "20", "李詠涵": "20", "陳瑋彤": "20", "劉宇軒": "20",

  // 21 桌
  "莊鎮名": "21", "黃勇儒": "21", "梁家慶": "21", "銘孝": "21", "粘庭禎": "21", "吳昱宏": "21",

  // 22 桌
  "Radha": "22", "陳亮宇": "22", "温玉珍": "22", "吳承翰": "22", "龍俊良": "22",

  // 23 桌
  "連蘭香": "23", "詹順化": "23", "王勇勝": "23", "曾志庭": "23", "叔公": "23",

  // 24 桌
  "瑩珊": "24", "秉鴻": "24", "二姑丈": "24", "彭桂秋": "24",

  // 25 桌
  "莊親": "25", "李親": "25", "小舅": "25", "冠綺": "25", "遠": "25", "豫": "25",

  // 26 桌
  "加祥": "26", "淑玲": "26", "村旺": "26", "永棟": "26", "秋美": "26", "楊過": "26", "鋒樹": "26",
};

const allNames = Object.keys(seatingData);

export default function WeddingSeatLookup() {
  const [input, setInput] = useState("");
  const [matches, setMatches] = useState([]);
  const [selectedName, setSelectedName] = useState(null);

  const handleChange = (value) => {
    setInput(value);
    setSelectedName(null);
    if (!value) return setMatches([]);
    const filtered = allNames.filter((name) => name.includes(value));
    setMatches(filtered.slice(0, 8));
  };

  const handleSelect = (name) => {
    setSelectedName(name);
    setInput(name);
    setMatches([]);
  };

  const handleReset = () => {
    setInput("");
    setMatches([]);
    setSelectedName(null);
  };

  const table = selectedName ? seatingData[selectedName] : null;

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#fafafa" }}>
      <div style={{ width: 360, padding: 24, background: "#fff", borderRadius: 16, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center" }}>💍 婚禮桌位查詢</h2>
        <p style={{ textAlign: "center", fontSize: 14, color: "#666" }}>請先輸入姓氏，再點選完整姓名</p>

        <input
          value={input}
          placeholder="例如：陳 / 林 / 魏"
          onChange={(e) => handleChange(e.target.value.trim())}
          style={{ width: "100%", padding: 10, marginTop: 12 }}
        />

        {matches.length > 0 && (
          <div style={{ border: "1px solid #ddd", borderRadius: 8, marginTop: 4, maxHeight: 180, overflowY: "auto" }}>
            {matches.map((name) => (
              <div key={name} onClick={() => handleSelect(name)} style={{ padding: 8, cursor: "pointer", borderBottom: "1px solid #eee" }}>
                {name}
              </div>
            ))}
          </div>
        )}

        {table && (
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <p>您的桌位是</p>
            <h1 style={{ fontSize: 48 }}>{table} 桌</h1>

            <button
              onClick={handleReset}
              style={{ marginTop: 16, padding: "10px 16px", borderRadius: 8, border: "1px solid #ccc", background: "#f9f9f9", cursor: "pointer" }}
            >
              重新查詢
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
