import { useState } from "react";
import "./App.css";
import Picture from "./components/Picture";

function App() {
  const [word, setWord] = useState("");
  const [photos, setPhoto] = useState([]);
  const key = import.meta.env.VITE_API_KEY;
  function searchImage(e) {
    e.preventDefault();
    if (!word) {
      alert("กรุณาระบุชื่อรูปภาพ");
    } else {
      fetchImageFromAPI();
    }
  }
  async function fetchImageFromAPI() {
    const url = `${
      import.meta.env.VITE_API_URL
    }?page=1&query=${word}&client_id=${key}&per_page=15`;                  // VITE_API_URL อยู่ที่ไฟล์ .env
    const res = await fetch(url);
    const data = await res.json();
    const result = data.results;
    if (result.length == 0) {
      alert("No Data");
      setWord("");
    } else {
      setPhoto(result);
    }
  }
  return (
    <>
      <h1>ระบบค้นหารูปภาพด้วย API</h1>
      <form onSubmit={searchImage}>
        <input
          type="text"
          placeholder="ป้อนชื่อรูปภาพที่ต้องการค้นหา"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type="submit">ค้นหา</button>
      </form>
      <div className="search-result">
        {photos.map((data, index) => {
          return <Picture {...data} key={index} />;
        })}
      </div>
    </>
  );
}

export default App;
