import React, { useState } from "react";
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

export default function TextToSpeech() {
  const theme = useTheme();
  const [langName, setLangName] = useState("en-US-JennyNeural");
  const [text, setText] = useState("");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  // Mock the SpeechConfig to prevent errors
  const speechConfig = {
    speechSynthesisVoiceName: langName,
  };

  const handleSynthesizeText = () => {
    if (!text) {
      alert("Please enter some text.");
      return;
    }

    setIsSynthesizing(true);

    // Mock synthesizer behavior
    setTimeout(() => {
      console.log("Synthesis completed.");
      setAudioUrl(null);
      setIsSynthesizing(false);
    }, 1000); // Mock the 1-second synthesize delay
  };

  const handlePlayAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      alert("No audio available. Please synthesize first.");
    }
  };

  const languages = [
    { code: "en-US-JennyNeural", name: "English (US)" },
    { code: "am-ET-MekdesNeural", name: "Amharic" },
    { code: "es-ES-ElviraNeural", name: "Spanish (Spain)" },
    { code: "fr-FR-DeniseNeural", name: "French" },
    { code: "de-DE-KatjaNeural", name: "German" },
    { code: "ar-SA-ZariyahNeural", name: "Arabic" },
  ];

  return (
    <div className="text-to-speech">
      <div className="container service-section">
        <div className="cont d-flex gap-3 align-items-center">
          <RiVoiceAiLine className="fs-4 mb-1 " style={{ color: "#4342F5" }} />
          <h2 className=" fs-4">AI Voiceover Studio</h2>
        </div>
        <p className="my-3 mb-4 description">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim
          voluptatibus sit error doloribus exercitationem laborum quis tempora
          explicabo esse quidem!
        </p>

        <div className="row selectors">
          <div className="col-md-6 col-lg-3">
            <FormControl sx={{ m: 0, width: 300, py: 0 }}>
              <select
                className="select-cat"
                value={langName}
                onChange={(e) => setLangName(e.target.value)}
              >
                {languages.map((lang, index) => (
                  <option key={index} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </FormControl>
          </div>
          {/* You can add more select options or remove this section if needed */}
        </div>

        <div className="row">
          <textarea
            rows={8}
            onChange={(e) => setText(e.target.value)}
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
