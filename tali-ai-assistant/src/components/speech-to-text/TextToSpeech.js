import React, { useEffect, useState, useRef } from "react";
import {
  AudioConfig,
  ResultReason,
  SpeechConfig,
  SpeechSynthesizer,
} from "microsoft-cognitiveservices-speech-sdk";
import "./TextToSpeech.css";
import { useTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import { RiVoiceAiLine } from "react-icons/ri";

export default function TextToSpeech() {
  const theme = useTheme();
  const [langName, setLangName] = useState("en-US-JennyNeural");
  const [text, setText] = useState("");
  const [referenceText, setReferenceText] = useState("");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [pitch, setPitch] = useState("default");
  const [rate, setRate] = useState("default");
  const [volume, setVolume] = useState("default");
  const synthesizerRef = useRef(null);

  // Language to voice mapping
  const languageToVoiceMap = {
    "English": "en-US-JennyNeural",
    "Spanish": "es-ES-ElviraNeural",
    "French": "fr-FR-DeniseNeural",
    "German": "de-DE-KatjaNeural",
    "Portuguese": "pt-BR-FranciscaNeural"
  };

  const handleSynthesizeText = () => {
    if (!text) {
      alert("Please enter some text.");
      return;
    }

    const speechKey = process.env.REACT_APP_SPEECH_KEY;
    const speechRegion = process.env.REACT_APP_SPEECH_REGION;

    if (!speechKey || !speechRegion) {
      alert("Missing Azure Speech credentials.");
      return;
    }

    const speechConfig = SpeechConfig.fromSubscription(speechKey, speechRegion);
    speechConfig.speechSynthesisVoiceName = langName;

    const audioConfig = AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);
    synthesizerRef.current = synthesizer;

    setIsSynthesizing(true);

    const ssml = `
      <speak version='1.0' xml:lang='en-US'>
        <voice name='${langName}'>
          <prosody pitch='${pitch}' rate='${rate}' volume='${volume}'>
            ${text}
          </prosody>
        </voice>
      </speak>`;

    synthesizer.speakSsmlAsync(
      ssml,
      (result) => {
        if (result.reason === ResultReason.SynthesizingAudioCompleted) {
          console.log("Synthesis finished.");
        } else {
          console.error("Speech synthesis failed:", result.errorDetails);
        }
        setIsSynthesizing(false);
        synthesizer.close();
        synthesizerRef.current = null;
      },
      (err) => {
        console.error("Speech synthesis error:", err);
        setIsSynthesizing(false);
        synthesizer.close();
        synthesizerRef.current = null;
      }
    );
  };

  const handleReset = () => {
    if (synthesizerRef.current) {
      synthesizerRef.current.stopSpeakingAsync(() => {
        synthesizerRef.current.close();
        synthesizerRef.current = null;
      });
    }
    setText("");
    setReferenceText("");
    setIsSynthesizing(false);
  };

  const generateRandomParagraph = () => {
    const languageTexts = {
      "English": {
        words: [
          "hello", "world", "computer", "programming", "language", "speech",
          "recognition", "technology", "application", "development", "interface",
          "user", "experience", "design", "algorithm", "database", "network",
          "security", "cloud", "storage", "framework", "component", "system"
        ],
        structure: "The {0} is {1} for {2} because it {3}. {4} {5} {6} in {7}."
      },
      "Spanish": {
        words: [
          "hola", "mundo", "computadora", "programación", "idioma", "voz",
          "reconocimiento", "tecnología", "aplicación", "desarrollo", "interfaz",
          "usuario", "experiencia", "diseño", "algoritmo", "base de datos", "red",
          "seguridad", "nube", "almacenamiento", "marco", "componente", "sistema"
        ],
        structure: "El {0} es {1} para {2} porque {3}. {4} {5} {6} en {7}."
      },
      "French": {
        words: [
          "bonjour", "monde", "ordinateur", "programmation", "langue", "voix",
          "reconnaissance", "technologie", "application", "développement", "interface",
          "utilisateur", "expérience", "conception", "algorithme", "base de données", "réseau",
          "sécurité", "nuage", "stockage", "cadre", "composant", "système"
        ],
        structure: "Le {0} est {1} pour {2} car il {3}. {4} {5} {6} dans {7}."
      },
      "German": {
        words: [
          "hallo", "welt", "computer", "programmierung", "sprache", "sprache",
          "erkennung", "technologie", "anwendung", "entwicklung", "schnittstelle",
          "benutzer", "erfahrung", "design", "algorithmus", "datenbank", "netzwerk",
          "sicherheit", "wolke", "speicher", "rahmen", "komponente", "system"
        ],
        structure: "Das {0} ist {1} für {2}, weil es {3}. {4} {5} {6} in {7}."
      },
      "Portuguese": {
        words: [
          "olá", "mundo", "computador", "programação", "idioma", "voz",
          "reconhecimento", "tecnologia", "aplicação", "desenvolvimento", "interface",
          "usuário", "experiência", "design", "algoritmo", "banco de dados", "rede",
          "segurança", "nuvem", "armazenamento", "estrutura", "componente", "sistema"
        ],
        structure: "O {0} é {1} para {2} porque {3}. {4} {5} {6} em {7}."
      }
    };

    // Get the language name from the voice
    const language = Object.keys(languageToVoiceMap).find(
      key => languageToVoiceMap[key] === langName
    ) || "English";

    const languageData = languageTexts[language] || languageTexts["English"];
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
    
    const paragraph = sentences.join('\n');
    setReferenceText(paragraph);
    setText(paragraph);
  };

  return (
    <div className="text-to-speech">
      <div className="container service-section">
        <div className="cont d-flex gap-3 align-items-center">
          <RiVoiceAiLine className="fs-4 mb-1" style={{ color: "#854fee" }} />
          <h2 className="fs-4 title">Practice</h2>
        </div>
        <p className="my-3 mb-4 description">
          Our AI-powered pronunciation practice feature offers an immersive,
          real-time language learning experience. Built on Microsoft Azure's
          advanced speech services, it analyzes your spoken input to deliver
          immediate feedback on pronunciation, fluency, accuracy, and
          completeness.
        </p>

        <div className="row selectors">
          <div className="col-md-6 col-lg-3">
            <FormControl sx={{ m: 0, width: 300, py: 0 }}>
              <select
                className="select-cat"
                value={langName}
                onChange={(e) => setLangName(e.target.value)}
              >
                {Object.entries(languageToVoiceMap).map(([language, voice]) => (
                  <option key={voice} value={voice}>
                    {language}
                  </option>
                ))}
              </select>
            </FormControl>
          </div>
          <div className="col-md-6 col-lg-3">
            <FormControl sx={{ m: 0, width: 300, py: 0 }}>
              <select
                className="select-cat"
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
              >
                <option value="default">Default Pitch</option>
                <option value="x-low">X-Low</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="x-high">X-High</option>
              </select>
            </FormControl>
          </div>
          <div className="col-md-6 col-lg-3">
            <FormControl sx={{ m: 0, width: 300, py: 0 }}>
              <select
                className="select-cat"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              >
                <option value="default">Default speed</option>
                <option value="x-slow">X-Slow</option>
                <option value="slow">Slow</option>
                <option value="medium">Medium</option>
                <option value="fast">Fast</option>
                <option value="x-fast">X-Fast</option>
              </select>
            </FormControl>
          </div>
          <div className="col-md-6 col-lg-3 generate-text-btn">
            <button onClick={generateRandomParagraph}>Generate Text</button>
          </div>
        </div>

        <div className="row">
          <textarea
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-area"
            placeholder="Enter the text you want to convert to speech"
          />

          <div className="text-end">
            <button
              onClick={handleReset}
              className="get-started overide-me mb-5 mt-0 reset-btn"
              style={{ marginRight: "10px" }}
            >
              Reset
            </button>

            <button
              onClick={handleSynthesizeText}
              disabled={isSynthesizing}
              className="get-started overide-me mb-5 mt-0"
            >
              {isSynthesizing ? "Synthesizing..." : "Synthesize"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}