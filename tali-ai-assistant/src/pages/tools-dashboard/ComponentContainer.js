import { Box } from "@mui/material";
import Translator from "../../components/translator/Translator";
import TextToSpeech from "../../components/speech-to-text/TextToSpeech";

function Componentcontainer({ pathname }) {
  const componentList = {
    "/translator": <Translator />,
    "/text-to-speech":<TextToSpeech/>
  };
  return (
    <Box
      sx={{
        background: "#111827",
        height: "100vh",
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {componentList[pathname]}
    </Box>
  );
}
export default Componentcontainer;
