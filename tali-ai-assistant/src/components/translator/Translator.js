import React from "react";
import "./Translator.css";
import img from "../../images/ai-logo.png";

export default function Translator() {
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
          <div className="drag-audio-file-text">
            Drag and drop an audio file here
          </div>
          <div className="drag-audio-file-text">or</div>
          <button className="upload-audio-button">Upload Audio</button>
        </div>
        <div className="selection-box">
          <label htmlFor="audio-language">Select Audio Language:</label>
          <select id="audio-language" className="audio-language-select">
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
          </select>
        </div>
        <div className="selection-box">
          <label htmlFor="task-type">Select Task Type:</label>
          <select id="task-type" className="task-type-select">
            <option value="transcription">Transcription</option>
            <option value="translation">Pronunciation Assessment</option>
          </select>
        </div>
      </div>

      {/* /* right-section area where the ai assessed result will display */}
      <div className="right-section">
        <div className="right-section-header">
          {/* accuracy score */}
          <div className="score-container">
            <div className="score">Accuracy Score</div>
            <div className="score-value">95%</div>
          </div>
          {/* completeness score */}
          <div className="score-container">
            <div className="score">Completeness Score</div>
            <div className="score-value">90%</div>
          </div>
          {/* fluency score */}
          <div className="score-container">
            <div className="score">Fluency Score</div>
            <div className="score-value">85%</div>
          </div>
        </div>
        {/* table to display score or each word along with suggestion */}
        <div className="table-container">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Word</th>
                <th scope="col">Score</th>
                <th scope="col">Error Type</th>
                <th scope="col">Suggestion</th>
                <th scope="col">Audio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hi</td>
                <td>95%</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>There</td>
                <td>95%</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>How</td>
                <td>95%</td>
                <td>John</td>
                <td>Doe</td>
                <td>@social</td>
              </tr>
              <tr>
                <td>How</td>
                <td>95%</td>
                <td>John</td>
                <td>Doe</td>
                <td>@social</td>
              </tr>
              <tr>
                <td>How</td>
                <td>95%</td>
                <td>John</td>
                <td>Doe</td>
                <td>@social</td>
              </tr>
              <tr>
                <td>How</td>
                <td>95%</td>
                <td>John</td>
                <td>Doe</td>
                <td>@social</td>
              </tr>
              <tr>
                <td>How</td>
                <td>95%</td>
                <td>John</td>
                <td>Doe</td>
                <td>@social</td>
              </tr>
              <tr>
                <td>How</td>
                <td>95%</td>
                <td>John</td>
                <td>Doe</td>
                <td>@social</td>
              </tr>
              <tr>
                <td>How</td>
                <td>95%</td>
                <td>John</td>
                <td>Doe</td>
                <td>@social</td>
              </tr>
              <tr>
                <td>How</td>
                <td>95%</td>
                <td>John</td>
                <td>Doe</td>
                <td>@social</td>
              </tr>
              <tr>
                <td>How</td>
                <td>95%</td>
                <td>John</td>
                <td>Doe</td>
                <td>@social</td>
              </tr>
              <tr>
                <td>How</td>
                <td>95%</td>
                <td>John</td>
                <td>Doe</td>
                <td>@social</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
