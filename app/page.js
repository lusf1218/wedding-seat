"use client";

import { useState } from "react";

// ✅ 已依你提供的 Excel「完整補齊 1–26 桌」
// 規則：每一位姓名只對應一桌
const seatingData = {
  // 1 桌
  "陸宇樂": "1", "陸佳誠": "1", "劉藝薰": "1", "全文娟": "1", "劉漢章": "1", "郭憶潔": "1",
  "楊政勳": "1", "楊景堯": "1", "陳秋汝": "1", "陳俊呈": "1", "蘇鋙彤": "1", "楊榮吉": "1",

  // 13 桌
  "陸志湛": "13", "陸佳霖": "13", "盧妍安": "13", "陸家蓁": "13", "石心嵐*2": "13", "全文鶴*2": "13", "全文富*2": "13",

  // 17 桌
  "鍾文達*2": "17", "陳威良*2": "17", "張啟誠*2": "17", "林文廷*2": "17", "林格州*2": "17",

  // 18 桌
  "陳品豪*2": "18", "張文杰*2": "18", "張金財*2": "18", "徐國揚*2": "18", "魏凱薰": "18", "陳欣伶": "18",

  // 14 桌
  "謝瑞益*3": "14", "沈德鈞*2": "14", "王聰仁": "14", "石世祥*3": "14", "王睿成": "14",

  // 16 桌
  "魏慧": "16", "陸育蒨": "16", "劉愛娟": "16", "魏正雄*2": "16", "魏淑華": "16", "劉莉莉": "16" , "陳國慶": "16", "魏茂春": "16", "劉素娟": "16",

  // 15 桌
  "劉彥騰*4": "15", "劉宜榛*2+1小": "15", "魏麗霜*2+1小": "15", "魏秀姍": "15",

  // 27 桌
  "魏梓洋": "27", "魏健華": "27", "魏妏玲*2+1小": "27", "萬駿騰": "27", "萬昱廷": "27", "陸霆希": "27", "陳冠廷": "27", "陳妍熙*2": "27",

  // 21 桌
  "邱奕綺*2+1小": "21", "周宛儀*2+1小": "21", "江雨軒": "21", "翁淑文": "21", "謝宜庭": "21", "龔佩珏": "21", "陳奕璇": "21",

  // 19 桌
  "林子琪": "19", "陸思穎": "19", "柯佩妤*2": "19", "林政寬": "19", "溫俊維": "19", "林彥廷": "19", "黃思婷*2": "19", "賈婷之": "19", 

  // 20 桌
  "廖千儀*2": "20", "林承暘": "20", "戴維文": "20", "許進發*2": "20", "葉品寬": "20", "李睿韜*2": "20",

  // 25 桌
  "辜昱維": "25", "賴禹璇": "25", "林軒丞": "25", "呂宜庭": "25", "許智斌": "25", "顏琮翰": "25", "張家榕*2": "25", "范銘澄": "25",

  // 12 桌
  "吳惠庭": "12", "張祐萍*2": "12", "周台興": "12", "王宇琦": "12", "周名倫": "12", "桂璿": "12",

  // 26 桌
  "陳熙*2": "26", "陳力鳳": "26", "范丞緯": "26", "陳惠芳*2": "26", "林蔓臻*2": "26", "林辰縈": "26",

  // 9 桌
  "陳肜羽*2": "9", "陳宏美": "9", "呂采霓*2": "9", "戴良諭*2": "9", "林語琦": "9", "蔡宜岑*2": "9",

  // 3 桌
  "趙一驎": "3", "黃靖博": "3", "陳明坤": "3", "夏定楠": "3", "陳俊霖*3": "3", "許凱智*2+1小": "3", "張祐銘": "3",

  // 8 桌
  "吳祚華": "8", "吳沛宸*2": "8", "曾璽宏": "8", "李宗穎": "8", "丁乾耀*2": "8", "尹聖凱": "8", "楊人懿": "8", "吳泓儒": "8",

  // 23 桌
  "邱晨光": "23", "楊子康*2+1小": "23", "孫韶甫": "23", "洪國靖": "23", "童煒傑*2": "23", "邱聖傑": "23", "林哲緯*2+1小": "23",

  // 24 桌
  "劉柏輝*2+2小": "24", "楊杰穎*2": "24", "許秩華": "24", "丁彥騰*2": "24", "鄭鈞燦*2": "24",

  // 22 桌
  "廖友茂*2": "22", "陳清大*2": "22", "洪偉倫*2": "22", "李詠涵": "22", "陳瑋彤": "22", "劉宇軒*2": "22",

  // 11 桌
  "莊鎮名*2": "11", "黃勇儒*2+1小": "11", "梁家慶": "11", "翁銘孝": "11", "粘庭禎": "11", "吳昱宏*2": "11",

  // 10 桌
  "Radha*2": "10", "陳亮宇*2": "10", "温玉珍*2": "10", "吳承翰": "10", "龍俊良*3+1小": "10",

  // 4 桌
  "連蘭香*2": "4", "詹順化*2": "4", "王勇勝*2": "4", "曾志庭*2": "4", "楊惠敏": "4", "楊榮吉(勳嬸婆)": "4",

  // 5 桌
  "盧瑩珊*4": "5", "盧秉鴻*4": "5", "王敬男": "5", "彭桂秋": "5",

  // 6 桌
  "莊榮森*2": "6", "李明福*2": "6", "陳柏村": "6", "陳冠綺": "6", "楊政遠*2+1小": "6", "楊政豫": "6",

  // 7 桌
  "加祥": "7", "淑玲": "7", "村旺": "7", "永棟": "7", "秋美": "7", "楊過*2": "7", "鋒樹*2": "7",
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
