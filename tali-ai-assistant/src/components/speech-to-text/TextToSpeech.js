import React, { useEffect, useState } from "react";
import {
  AudioConfig,
  ResultReason,
  SpeechConfig,
  SpeechSynthesizer,
} from "microsoft-cognitiveservices-speech-sdk";
import "./TextToSpeech.css";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { RiVoiceAiLine } from "react-icons/ri";
import axios from "axios";
 
export default function TextToSpeech() {
  const theme = useTheme();
  const [langName, setLangName] = useState("en-US-JennyNeural");
  const [text, setText] = useState("");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [pitch, setPitch] = useState("default");
  const [rate, setRate] = useState("default");
  const [volume, setVolume] = useState("default");
 
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
 
    setIsSynthesizing(true);
 
    // Wrap text with SSML for pitch, rate, and volume
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
      },
      (err) => {
        console.error("Speech synthesis error:", err);
        setIsSynthesizing(false);
        synthesizer.close();
      }
    );
  };
 
  // Fetch languages from the API
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const languageSet = new Set();
        data.forEach((country) => {
          const langs = country.languages;
          if (langs) {
            Object.values(langs).forEach((lang) => languageSet.add(lang));
          }
        });
        setLanguages([...languageSet]);
      });
  }, []);
 
  // text generation
  // const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState("");
  const [textLoading, settextLoading] = useState(false);
 
  const [referenceText, setReferenceText] = useState("");
  const generateRandomParagraph = () => {
    const lines = [];
    const randomWords = [
      "example",
      "voice",
      "speech",
      "language",
      "help",
      "interactive",
      "user",
      "pronunciation",
      "system",
      "application",
      "feedback",
      "analysis",
      "technology",
      "react",
      "interface",
      "improvement",
      "challenge",
      "session",
      "accuracy",
      "integration",
    ];
 
    for (let i = 0; i < 7; i++) {
      let line = "";
      for (let j = 0; j < 6; j++) {
        line +=
          randomWords[Math.floor(Math.random() * randomWords.length)] + " ";
      }
      lines.push(line.trim() + ".");
    }
    setReferenceText(lines.join("\n"));
    setText(lines.join("\n"));
  };
 
  return (
    <div className="text-to-speech">
      <div className="container service-section">
        <div className="cont d-flex gap-3 align-items-center">
          <RiVoiceAiLine className="fs-4 mb-1 " style={{ color: "#4342F5" }} />
          <h2 className=" fs-4">Practice</h2>
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
                {languages.map((lang) => {
                  return <option value={lang}>{lang}</option>;
                })}
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
            {/* auto generate button */}
            <button onClick={() => generateRandomParagraph()}>
              Generate Text
            </button>
          </div>
          {/* You can add more select options or remove this section if needed */}
        </div>
 
        <div className="row">
          <textarea
            rows={8}
            onChange={(e) => setText(e.target.value)}
            value={text}
            className="text-area"
            placeholder="Enter the text you want to convert to speech"
          />
 
          <div className="text-end">
            <button
              onClick={handleSynthesizeText}
              disabled={isSynthesizing}
              className="get-started overide-me mb-5 mt-0"
            >
              {isSynthesizing ? "Synthesizing..." : "Synthesize"}
            </button>
 
            {/* You can uncomment this once audio functionality is properly set up */}
            {/* <button onClick={handlePlayAudio} disabled={!audioUrl} className="get-started overide-me mb-5 mt-0">
              Listen
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}