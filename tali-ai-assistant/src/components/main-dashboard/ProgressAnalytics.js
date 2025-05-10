import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area
} from "recharts";
import "./ProgressAnalytics.css";
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function ProgressAnalytics() {
  const [pronunciationAccuracyData, setPronunciationAccuracyData] = useState([]);
  const [fluencyData, setFluencyData] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setPronunciationAccuracyData(data.pronunciationAccuracyData || []);
          setFluencyData(data.fluencyData || []);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="progress-analytics">
      <h2 className="progress-title">Speech Therapy Analytics</h2>

      <div className="charts-wrapper">
        {/* ✅ Chart 1: Pronunciation Accuracy */}
        <div className="chart-box">
          <h4 className="chart-heading">Pronunciation Accuracy (Data From Last 7 Days)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={pronunciationAccuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="day" stroke="#999" />
              <YAxis domain={[0, 100]} tickFormatter={(val) => `${val}%`} stroke="#999" />
              <Tooltip formatter={(val) => `${val}%`} />
              <Area type="monotone" dataKey="accuracy" stroke="#28a745" fill="#28a74533" />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#28a745"
                strokeWidth={2}
                dot={{ stroke: "#fff", strokeWidth: 2, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ✅ Chart 2: Speech Fluency */}
        <div className="chart-box">
          <h4 className="chart-heading">Speech Fluency Result (Data From Last 7 Days)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={fluencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="day" stroke="#999" />
              <YAxis domain={[0, 100]} tickFormatter={(val) => `${val}%`} stroke="#999" />
              <Tooltip formatter={(val) => `${val}%`} />
              <Area type="monotone" dataKey="fluency" stroke="#007bff" fill="#007bff33" />
              <Line
                type="monotone"
                dataKey="fluency"
                stroke="#007bff"
                strokeWidth={2}
                dot={{ stroke: "#fff", strokeWidth: 2, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
