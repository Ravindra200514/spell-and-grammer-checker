import React, { useState } from "react";

const SpellGrammarCheck = () => {
  const [text, setText] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSpellCheck = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          text: text,
          language: "en-US",
        }),
      });

      const result = await response.json();
      if (result.matches && result.matches.length > 0) {
        let updatedText = text;
        // Sort matches by offset descending so replacements don't change subsequent offsets
        const sortedMatches = [...result.matches].sort((a, b) => b.offset - a.offset);
        
        sortedMatches.forEach((match) => {
          const bestReplacement = match.replacements[0]?.value;
          if (bestReplacement) {
            updatedText =
              updatedText.slice(0, match.offset) +
              bestReplacement +
              updatedText.slice(match.offset + match.length);
          }
        });
        setCorrectedText(updatedText);
      } else {
        setCorrectedText("No mistakes found! Your text looks great.");
      }
    } catch (error) {
      console.error("Error:", error);
      setCorrectedText("Error checking text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">
        Spell & Grammar Check
      </h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="5"
        placeholder="Type or paste your text here..."
        className="input-field"
      />
      <button
        onClick={handleSpellCheck}
        disabled={loading || !text.trim()}
        className="btn-primary"
      >
        {loading ? (
          <span className="loading-text">Checking<span className="loading-dots"></span></span>
        ) : (
          "Check Text"
        )}
      </button>
      
      {correctedText && (
        <div className="result-container">
          <h3 className="result-title">Result:</h3>
          <textarea
            value={correctedText}
            readOnly
            rows="5"
            className="input-field"
            style={{ marginBottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          />
        </div>
      )}
    </div>
  );
};

export default SpellGrammarCheck;
