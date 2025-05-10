import React, { useState, useRef, useEffect } from "react";
import "./Translator.css";
import img from "../../images/ai-logo.png";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Translator() {
  const [scores, setScores] = useState(null);
  const [wordDetails, setWordDetails] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [referenceText, setReferenceText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [currentUser, setCurrentUser] = useState(null);

  const key = process.env.REACT_APP_SPEECH_KEY;
  const region = process.env.REACT_APP_SPEECH_REGION;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  const startRecording = async () => {
    if (referenceText.trim() === "") {
      alert("Please enter a reference text before starting the recording.");
      return;
    }

    setIsRecording(true);
    audioChunksRef.current = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const arrayBuffer = await audioBlob.arrayBuffer();

      const audioContext = new AudioContext({ sampleRate: 16000 });
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const rawPCMData = audioBuffer.getChannelData(0);
      const wavBuffer = encodeWAV(rawPCMData, audioBuffer.sampleRate);

      const pushStream = sdk.AudioInputStream.createPushStream();
      pushStream.write(new Uint8Array(wavBuffer));
      pushStream.close();

      const pronunciationConfig = new sdk.PronunciationAssessmentConfig(
        referenceText,
        sdk.PronunciationAssessmentGradingSystem.HundredMark,
        sdk.PronunciationAssessmentGranularity.Word,
        true
      );

      const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
      const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
      speechConfig.speechRecognitionLanguage = selectedLanguage;

      const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
      pronunciationConfig.applyTo(recognizer);

      recognizer.recognizeOnceAsync(async (result) => {
        if (result.reason === sdk.ResultReason.RecognizedSpeech) {
          const json = JSON.parse(result.properties.getProperty(sdk.PropertyId.SpeechServiceResponse_JsonResult));
          const assessment = json.NBest[0].PronunciationAssessment;
          const words = json.NBest[0].Words;

          setScores(assessment);
          setWordDetails(words);

          if (currentUser) {
            try {
              const userRef = doc(db, "users", currentUser.uid);
              const userSnap = await getDoc(userRef);
              let data = userSnap.data();
              const currentDay = new Date().toLocaleDateString("en-US", { weekday: "short" });

              // Fallback default data if pronunciationAccuracyData or fluencyData is undefined
              let weekData = data.pronunciationAccuracyData || [
                { day: "Mon", accuracy: 0 },
                { day: "Tue", accuracy: 0 },
                { day: "Wed", accuracy: 0 },
                { day: "Thu", accuracy: 0 },
                { day: "Fri", accuracy: 0 },
                { day: "Sat", accuracy: 0 },
                { day: "Sun", accuracy: 0 },
              ];

              let fluencyData = data.fluencyData || [
                { day: "Mon", fluency: 0 },
                { day: "Tue", fluency: 0 },
                { day: "Wed", fluency: 0 },
                { day: "Thu", fluency: 0 },
                { day: "Fri", fluency: 0 },
                { day: "Sat", fluency: 0 },
                { day: "Sun", fluency: 0 },
              ];

              // Update pronunciation accuracy and fluency for current day
              const updatedWeekData = weekData.map((entry) =>
                entry.day === currentDay
                  ? { ...entry, accuracy: assessment.AccuracyScore }
                  : entry
              );

              const updatedFluencyData = fluencyData.map((entry) =>
                entry.day === currentDay
                  ? { ...entry, fluency: assessment.FluencyScore }
                  : entry
              );

              // Update Firebase document
              await updateDoc(userRef, {
                pronunciationAccuracyData: updatedWeekData,
                fluencyData: updatedFluencyData,  // Store updated fluency data
                accuracyLogs: arrayUnion({
                  timestamp: new Date().toISOString(),
                  referenceText,
                  accuracy: assessment.AccuracyScore,
                  completeness: assessment.CompletenessScore,
                  fluency: assessment.FluencyScore, // Store fluency score in logs
                  pronunciationScore: assessment.PronScore,
                }),
                wordsPracticed: increment(words.length),
                sentencesAnalyzed: increment(1),
                minutesOfFeedback: increment(0.5),
                feedbackSessions: increment(1),
                audioUploads: increment(1),
              });
            } catch (err) {
              console.error("Error storing pronunciation data:", err);
            }
          }
        } else {
          console.error("Speech not recognized:", result.errorDetails);
        }
        recognizer.close();
      }, (err) => {
        console.error("Error recognizing speech:", err);
        recognizer.close();
      });
    };

    mediaRecorder.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current?.stop();
  };

  const encodeWAV = (samples, sampleRate) => {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    const writeString = (view, offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    const floatTo16BitPCM = (output, offset, input) => {
      for (let i = 0; i < input.length; i++) {
        let s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset + i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      }
    };

    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(view, 8, "WAVE");
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, "data");
    view.setUint32(40, samples.length * 2, true);

    floatTo16BitPCM(view, 44, samples);
    return buffer;
  };

  return (
    <div className="translator">
      <div className="left-section">
        <div className="left-section-header">
          <div className="icon">
            <img src={img} alt="AI Icon" />
          </div>
          <div className="title">AI ProHelper</div>
        </div>

        <div className="drag-audio-file-area">
          <textarea
            name="reference-text"
            value={referenceText}
            onChange={(e) => setReferenceText(e.target.value)}
            rows={4}
            placeholder="Enter your reference text here"
          ></textarea>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className="upload-audio-button"
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
        </div>

        <div className="selection-box">
          <label htmlFor="audio-language">Select Audio Language:</label>
          <select
            id="audio-language"
            className="audio-language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="en-US">English</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
            <option value="de-DE">German</option>
          </select>
        </div>

        <div className="selection-box">
          <label htmlFor="task-type">Select Task Type:</label>
          <select id="task-type" className="task-type-select" defaultValue="translation">
            <option value="transcription">Transcription</option>
            <option value="translation">Pronunciation Assessment</option>
          </select>
        </div>
      </div>

      <div className="right-section">
        <div className="right-section-header">
          <div className="score-container">
            <div className="score">Accuracy Score</div>
            <div className="score-value">
              {scores ? `${scores.AccuracyScore}%` : "--"}
            </div>
          </div>
          <div className="score-container">
            <div className="score">Completeness Score</div>
            <div className="score-value">
              {scores ? `${scores.CompletenessScore}%` : "--"}
            </div>
          </div>
          <div className="score-container">
            <div className="score">Fluency Score</div>
            <div className="score-value">
              {scores ? `${scores.FluencyScore}%` : "--"}
            </div>
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Word</th>
                <th>Score</th>
                <th>Suggestion</th>
              </tr>
            </thead>
            <tbody>
              {wordDetails.map((word, idx) => (
                <tr key={idx}>
                  <td>{word.Word}</td>
                  <td>{word.AccuracyScore}%</td>
                  <td>{word.ErrorType ? "Check pronunciation" : "✔"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
