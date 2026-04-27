import { useState } from "react";

function Translate() {
  const [text, setText] = useState("");
  const [lang, setLang] = useState("en");
  const [translateResult, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const translate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError("");
    setResult("");

    const params = new URLSearchParams({
      text: text,
      lang: lang,
    });

    try {
      const res = await fetch(
        `https://spells-server.onrender.com/translate/?${params.toString()}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        throw new Error("Translation failed. Please try again later.");
      }

      const result = await res.json();
      setResult(result.translatedText || "No translation available");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h1 className="card-title">Text Translator</h1>

      <textarea
        className="input-field"
        value={text}
        placeholder="Enter text to translate..."
        onChange={(e) => setText(e.target.value)}
      />

      <select
        className="input-field"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="hi">Hindi</option>
      </select>

      <button
        className="btn-primary"
        onClick={translate}
        disabled={loading || !text.trim()}
      >
        {loading ? (
          <span className="loading-text">Translating<span className="loading-dots"></span></span>
        ) : (
          "Translate"
        )}
      </button>

      {(error || translateResult) && (
        <div className="result-container">
          {error && <div className="error-text">{error}</div>}
          {translateResult && (
            <>
              <h3 className="result-title">Translation:</h3>
              <div className="result-box">
                {translateResult}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Translate;
