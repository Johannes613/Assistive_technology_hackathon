import React, { useEffect, useState } from "react";
import "./MainDashboard.css";
import ProgressAnalytics from "./ProgressAnalytics";
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function MainDashboard() {
  const [userData, setUserData] = useState({
    name: "",
    activePlan: null,
    assessmentCredits: 0,
    wordsPracticed: 0,
    sentencesAnalyzed: 0,
    minutesFeedback: 0,
    correctPronunciations: 0,
    exercisesCompleted: 0,
    customWordsTrained: 0,
    feedbackSessions: 0,
    audioUploads: 0,
  });

  const [pronunciationData, setPronunciationData] = useState({
    accuracyData: [],
    fluencyData: [],
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();

          const accuracyData = data.pronunciationAccuracyData || [];
          const fluencyData = data.fluencyData || [];

          setUserData({
            name: data.name || "Yohannis Adamu",
            activePlan: data.activePlan || "No Active Plan",
            assessmentCredits: data.assessmentCredits || 0,
            wordsPracticed: data.wordsPracticed || 0,
            sentencesAnalyzed: data.sentencesAnalyzed || 0,
            minutesFeedback: data.minutesFeedback || 0,
            correctPronunciations: data.correctPronunciations || 0,
            exercisesCompleted: data.exercisesCompleted || 0,
            customWordsTrained: data.customWordsTrained || 0,
            feedbackSessions: data.feedbackSessions || 0,
            audioUploads: data.audioUploads || 0,
          });

          setPronunciationData({
            accuracyData,
            fluencyData,
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-box">
          <div className="header-date">📅 May 10, 2025 5:20 PM</div>
          <h2 className="header-welcome">Welcome, {userData.name}</h2>
          <span className="current-plan">CURRENT PLAN</span>
          <h3 className="no-plan">{userData.activePlan}</h3>
          <p className="plan-desc">
            {userData.activePlan === "No Active Plan"
              ? "You do not have an active speech training subscription"
              : `Your active plan is: ${userData.activePlan}`}
          </p>
          <button className="plan-button">See Speech Plans</button>
        </div>

        {/* Analytics Chart */}
        <div className="graph-wrapper">
          <ProgressAnalytics />
        </div>
      </div>

      {/* Usage Section */}
      <div className="usage-section">
        <div className="usage-header">
          <div className="usage-item">
            <p>Assessment Credits Left</p>
            <h3>{userData.assessmentCredits}</h3>
          </div>
          <div className="usage-item">
            <p>Words Practiced</p>
            <h3>{userData.wordsPracticed}</h3>
          </div>
          <div className="usage-item">
            <p>Sentences Analyzed</p>
            <h3>{userData.sentencesAnalyzed}</h3>
          </div>
          <div className="usage-item">
            <p>Minutes of Feedback</p>
            <h3>{userData.minutesFeedback}</h3>
          </div>
        </div>

        <div className="progress-bar">
          <div className="progress-used"></div>
        </div>

        <div className="document-stats">
          <div className="stat-box">
            <p>Correct Pronunciations</p>
            <h4>{userData.correctPronunciations}%</h4>
          </div>
          <div className="stat-box">
            <p>Exercises Completed</p>
            <h4>{userData.exercisesCompleted}</h4>
          </div>
          <div className="stat-box">
            <p>Custom Words Trained</p>
            <h4>{userData.customWordsTrained}</h4>
          </div>
          <div className="stat-box">
            <p>Pronunciation Analysis</p>
            <h4>
              {pronunciationData.accuracyData.length > 0
                ? `${(
                    pronunciationData.accuracyData.reduce(
                      (acc, data) => acc + data.accuracy,
                      0
                    ) / pronunciationData.accuracyData.length
                  ).toFixed(2)}%`
                : "No data available"}
            </h4>
          </div>
          <div className="stat-box">
            <p>Average Fluency Score</p>
            <h4>
              {pronunciationData.fluencyData.length > 0
                ? `${(
                    pronunciationData.fluencyData.reduce(
                      (acc, data) => acc + data.fluency,
                      0
                    ) / pronunciationData.fluencyData.length
                  ).toFixed(2)}%`
                : "No data available"}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
