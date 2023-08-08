
import React, { useState } from "react";
import countries from "../data";

const Translate = () => {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [translateFrom, setTranslateFrom] = useState("en-US");
  const [translateTo, setTranslateTo] = useState("hi-IN");

  const handleExchangeClick = () => {
    setFromText(toText);
    setToText(fromText);
    setTranslateFrom(translateTo);
    setTranslateTo(translateFrom);
  };

  const handleTranslateClick = () => {
    if (!fromText) return;
    setToText("Translating...");

    let apiUrl = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setToText(data.responseData.translatedText);
      });
  };

  const handleCopyClick = (value) => {
    navigator.clipboard.writeText(value);
  };

  const handleSpeakClick = (text, lang) => {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="text-input">
          <textarea
            spellCheck="false"
            className="from-text"
            placeholder="Enter text"
            value={fromText}
            onChange={(e) => setFromText(e.target.value)}
          ></textarea>
          <textarea
            readOnly
            spellCheck="false"
            className="to-text"
            placeholder="Translate"
            value={toText}
          ></textarea>
        </div>
        <ul className="controls">
          <li className="row from">
            <div className="icons">
              <i
                className="fas fa-volume-up"
                onClick={() => handleSpeakClick(fromText, translateFrom)}
              ></i>
              <i
                className="fas fa-copy"
                onClick={() => handleCopyClick(fromText)}
              ></i>
            </div>
            <select
              value={translateFrom}
              onChange={(e) => setTranslateFrom(e.target.value)}
            >
              {Object.keys(countries).map((country_code) => (
                <option key={country_code} value={country_code}>
                  {countries[country_code]}
                </option>
              ))}
            </select>
          </li>
          <li className="exchange">
            <i
              className="fas fa-exchange-alt"
              onClick={handleExchangeClick}
            />
          </li>
          <li className="row to ">
            <select
              value={translateTo}
              onChange={(e) => setTranslateTo(e.target.value)}
            >
              {Object.keys(countries).map((country_code) => (
                <option key={country_code} value={country_code}>
                  {countries[country_code]}
                </option>
              ))}
            </select>
            <div className="icons">
              <i
                className="fas fa-volume-up"
                onClick={() => handleSpeakClick(toText, translateTo)}
              ></i>
              <i
                className="fas fa-copy"
                onClick={() => handleCopyClick(toText)}
              ></i>
            </div>
          </li>
        </ul>
      </div>
      <button onClick={handleTranslateClick}>Translate Text</button>
    </div>
  );
};

export default Translate;
