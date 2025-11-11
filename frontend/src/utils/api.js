import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";


export async function analyzeCode(code) {
  try {
    const res = await axios.post(`${API_BASE}/review/`, { code });
    return res.data;
  } catch (err) {
    console.error("API Error:", err);
    return { error: "Failed to analyze code" };
  }
}
