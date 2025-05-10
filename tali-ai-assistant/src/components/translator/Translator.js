import React, { useState, useRef, useEffect } from "react";
import "./Translator.css";
import img from "../../images/ai-logo.png";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { auth, db } from "../../config/firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
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

  const generateRandomParagraph = () => {
    const languageWords = {
      "en-US": {
        words: [
          "hello", "world", "computer", "programming", "language", "speech",
          "recognition", "technology", "application", "development", "interface",
          "user", "experience", "design", "algorithm", "database", "network",
          "security", "cloud", "storage", "framework", "component", "system"
        ],
        structure: "The {0} is {1} for {2} because it {3}. {4} {5} {6} in {7}."
      },
      "es-ES": {
        words: [
          "hola", "mundo", "computadora", "programación", "idioma", "voz",
          "reconocimiento", "tecnología", "aplicación", "desarrollo", "interfaz",
          "usuario", "experiencia", "diseño", "algoritmo", "base de datos", "red",
          "seguridad", "nube", "almacenamiento", "marco", "componente", "sistema"
        ],
        structure: "El {0} es {1} para {2} porque {3}. {4} {5} {6} en {7}."
      },
      "fr-FR": {
        words: [
          "bonjour", "monde", "ordinateur", "programmation", "langue", "voix",
          "reconnaissance", "technologie", "application", "développement", "interface",
          "utilisateur", "expérience", "conception", "algorithme", "base de données", "réseau",
          "sécurité", "nuage", "stockage", "cadre", "composant", "système"
        ],
        structure: "Le {0} est {1} pour {2} car il {3}. {4} {5} {6} dans {7}."
      },
      "de-DE": {
        words: [
          "hallo", "welt", "computer", "programmierung", "sprache", "sprache",
          "erkennung", "technologie", "anwendung", "entwicklung", "schnittstelle",
          "benutzer", "erfahrung", "design", "algorithmus", "datenbank", "netzwerk",
          "sicherheit", "wolke", "speicher", "rahmen", "komponente", "system"
        ],
        structure: "Das {0} ist {1} für {2}, weil es {3}. {4} {5} {6} in {7}."
      },
      "pt-BR": {
        words: [
          "olá", "mundo", "computador", "programação", "idioma", "voz",
          "reconhecimento", "tecnologia", "aplicação", "desenvolvimento", "interface",
          "usuário", "experiência", "design", "algoritmo", "banco de dados", "rede",
          "segurança", "nuvem", "armazenamento", "estrutura", "componente", "sistema"
        ],
        structure: "O {0} é {1} para {2} porque {3}. {4} {5} {6} em {7}."
      }
    };

    const languageData = languageWords[selectedLanguage] || languageWords["en-US"];
    const { words, structure } = languageData;
    
    const sentences = [];
    for (let i = 0; i < 5; i++) {
      const sentence = structure
        .split(/\{(\d+)\}/)
        .map((part, index) => 
          index % 2 === 1 ? words[Math.floor(Math.random() * words.length)] : part
        )
        .join('');
      sentences.push(sentence);
    }
    
    setReferenceText(sentences.join('\n'));
  };

  const startRecording = async () => {
    if (referenceText.trim() === "") {
      alert("Please enter a reference text before starting the recording.");
      return;
    }

    setIsRecording(true);
    audioChunksRef.current = [];

    try {
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

        recognizer.recognizeOnceAsync(
          async (result) => {
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
                  const data = userSnap.data();
                  const currentDay = new Date().toLocaleDateString("en-US", { weekday: "short" });

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

                  const updatedWeekData = weekData.map((entry) =>
                    entry.day === currentDay ? { ...entry, accuracy: assessment.AccuracyScore } : entry
                  );

                  const updatedFluencyData = fluencyData.map((entry) =>
                    entry.day === currentDay ? { ...entry, fluency: assessment.FluencyScore } : entry
                  );

                  await updateDoc(userRef, {
                    pronunciationAccuracyData: updatedWeekData,
                    fluencyData: updatedFluencyData,
                    accuracyLogs: arrayUnion({
                      timestamp: new Date().toISOString(),
                      referenceText,
                      accuracy: assessment.AccuracyScore,
                      completeness: assessment.CompletenessScore,
                      fluency: assessment.FluencyScore,
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
          },
          (err) => {
            console.error("Error recognizing speech:", err);
            recognizer.close();
          }
        );
      };

      mediaRecorder.start();
    } catch (err) {
      console.error("Error starting media recorder:", err);
    }
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
        output.setInt16(offset + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
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

  // Separate completed and incomplete words
  const completedWords = wordDetails.filter(
    (word) => word.PronunciationAssessment?.AccuracyScore !== undefined
  );
  const incompleteWords = wordDetails.filter(
    (word) => word.PronunciationAssessment?.AccuracyScore === undefined
  );

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
            rows={8}
            placeholder="Enter your reference text here"
          ></textarea>
        </div>

        <div className="buttons-action">
          <button onClick={generateRandomParagraph} className="generate-text-button">
            Generate Text
          </button>
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
            <option value="en-US">English (US)</option>
            <option value="es-ES">Spanish (Spain)</option>
            <option value="fr-FR">French (France)</option>
            <option value="de-DE">German</option>
            <option value="pt-BR">Portuguese (Brazil)</option>
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
              {/* Completed words first */}
              {completedWords.map((word, idx) => (
                <tr key={`completed-${idx}`} className="completed-word">
                  <td>{word.Word}</td>
                  <td>{word.PronunciationAssessment?.AccuracyScore}%</td>
                  <td>{word.ErrorType ? "Check pronunciation" : "✔"}</td>
                </tr>
              ))}
              
              {/* Incomplete words after */}
              {incompleteWords.map((word, idx) => (
                <tr key={`incomplete-${idx}`} className="incomplete-word">
                  <td>{word.Word}</td>
                  <td>Incomplete</td>
                  <td>Not assessed</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}