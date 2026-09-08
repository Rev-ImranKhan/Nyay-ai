import { useState } from "react";
import axios from "axios";
import { FaMicrophone, FaFileAlt, FaBalanceScale, FaTimes, FaVolumeUp, FaDownload, FaStop } from "react-icons/fa";

export default function App() {
  const [query, setQuery] = useState("");
  const [advice, setAdvice] = useState("");
  const [fir, setFir] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("advice");
  const [listening, setListening] = useState(false);
  const [similarCases, setSimilarCases] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [voiceLang, setVoiceLang] = useState("en-US");

  const getSimilarCases = async (q) => {
    try {
      const res = await axios.post("https://nyay-ai-backend-vjrt.onrender.com/legal/similar-cases", {
        description: q,
        language: "hi",
      });
      setSimilarCases(res.data.data);
    } catch (e) {
      console.log("Similar cases error:", e);
    }
  };

  const getAdvice = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.post("https://nyay-ai-backend-vjrt.onrender.com/legal/advice", {
        description: query,
        language: "hi",
      });
      setAdvice(res.data.advice);
      getSimilarCases(query);
    } catch (e) {
      setAdvice("Error aaya, backend check karo.");
    }
    setLoading(false);
  };

  const getFir = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.post("https://nyay-ai-backend-vjrt.onrender.com/legal/fir", {
        description: query,
        language: "hi",
      });
      setFir(res.data.fir_content);
    } catch (e) {
      setFir("Error aaya, backend check karo.");
    }
    setLoading(false);
  };

  const speakAdvice = async () => {
    if (!advice) return;

    if (speaking) {
      window.currentAudio?.pause();
      window.currentAudio = null;
      setSpeaking(false);
      return;
    }

    setSpeaking(true);
    try {
      const response = await axios.post(
        "https://nyay-ai-backend-vjrt.onrender.com/legal/speak",
        { description: query, language: "hi" },
        { responseType: "blob" }
      );
      const audioUrl = URL.createObjectURL(
        new Blob([response.data], { type: "audio/mpeg" })
      );
      const audio = new Audio(audioUrl);
      window.currentAudio = audio;
      audio.play();
      audio.onended = () => {
        setSpeaking(false);
        window.currentAudio = null;
      };
    } catch (e) {
      setSpeaking(false);
    }
  };

  const downloadFIR = async () => {
    if (!query) return;
    try {
      const response = await axios.post(
        "https://nyay-ai-backend-vjrt.onrender.com/legal/download-fir",
        { description: query, language: "hi" },
        { responseType: "blob" }
      );
      const url = URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "NYAY_AI_FIR_Draft.pdf";
      link.click();
    } catch (e) {
      console.log("PDF error:", e);
    }
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser voice support nahi karta!");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = voiceLang;
    recognition.interimResults = false;
    recognition.start();
    setListening(true);
    recognition.onresult = (e) => {
      setQuery(e.results[0][0].transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-serif">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_#1a1a2e_0%,_#0a0a0f_70%)] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-yellow-900/30 px-8 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaBalanceScale className="text-yellow-500 text-3xl" />
            <div>
              <h1 className="text-2xl font-bold tracking-widest text-yellow-400"
                style={{ fontFamily: "Georgia, serif" }}>
                NYAY AI
              </h1>
              <p className="text-xs text-yellow-700 tracking-widest uppercase">
                India's AI Legal Assistant
              </p>
            </div>
          </div>
          <div className="text-xs text-gray-500 tracking-wider">
            ⚖️ न्याय • Justice • Insaf
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 max-w-5xl mx-auto px-8 py-12">

        {/* Hero */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-wide"
            style={{ fontFamily: "Georgia, serif" }}>
            Ask Your{" "}
            <span className="text-yellow-400">Legal Question</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Speak or type in any language — AI responds instantly
          </p>
        </div>

        {/* Input Box */}
        <div className="bg-[#111118] border border-yellow-900/40 rounded-2xl p-6 mb-8 shadow-2xl">

          {/* Language Selector */}
          <div className="mb-4">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
              Select Voice Language
            </p>
            <select
              value={voiceLang}
              onChange={(e) => setVoiceLang(e.target.value)}
              className="bg-[#0a0a0f] border border-gray-700 rounded-xl px-4 py-2 text-white w-full focus:outline-none focus:border-yellow-600"
            >
              <option value="en-US">🇬🇧 English</option>
              <option value="hi-IN">🇮🇳 Hindi</option>
              <option value="kn-IN">🌏 Kannada</option>
              <option value="ta-IN">🌏 Tamil</option>
              <option value="te-IN">🌏 Telugu</option>
              <option value="mr-IN">🌏 Marathi</option>
              <option value="bn-IN">🌏 Bengali</option>
              <option value="gu-IN">🌏 Gujarati</option>
              <option value="pa-IN">🌏 Punjabi</option>
            </select>
          </div>

          <textarea
            className="w-full bg-[#0a0a0f] border border-gray-700 rounded-xl p-4 text-white placeholder-gray-600 resize-none focus:outline-none focus:border-yellow-600 transition-colors mb-4"
            rows={4}
            placeholder="Describe your legal problem here... e.g. 'My landlord is evicting me without notice'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={startListening}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
                listening
                  ? "bg-red-600 animate-pulse"
                  : "bg-yellow-900/40 hover:bg-yellow-800/60 border border-yellow-700/50"
              }`}
            >
              <FaMicrophone />
              {listening ? "Listening..." : "Speak"}
            </button>

            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setAdvice("");
                  setFir("");
                  setSimilarCases(null);
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all"
              >
                <FaTimes /> Clear
              </button>
            )}

            <div className="flex-1 flex gap-3 justify-end flex-wrap">
              <button
                onClick={() => { setActiveTab("advice"); getAdvice(); }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-yellow-500 hover:bg-yellow-400 text-black transition-all"
              >
                <FaBalanceScale /> Get Legal Advice
              </button>
              <button
                onClick={() => { setActiveTab("fir"); getFir(); }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                <FaFileAlt /> Draft FIR
              </button>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-yellow-400 tracking-widest">AI is thinking...</p>
          </div>
        )}

        {/* Result Box */}
        {!loading && (activeTab === "advice" ? advice : fir) && (
          <div className="bg-[#111118] border border-yellow-900/40 rounded-2xl p-8 shadow-2xl mb-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-yellow-900/30">
              <div className="flex items-center gap-3">
                {activeTab === "advice" ? (
                  <>
                    <FaBalanceScale className="text-yellow-500 text-xl" />
                    <h3 className="text-yellow-400 font-bold tracking-wider uppercase text-sm">
                      Legal Advice
                    </h3>
                  </>
                ) : (
                  <>
                    <FaFileAlt className="text-yellow-500 text-xl" />
                    <h3 className="text-yellow-400 font-bold tracking-wider uppercase text-sm">
                      FIR Draft
                    </h3>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                {activeTab === "advice" && advice && (
                  <button
                    onClick={speakAdvice}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      speaking
                        ? "bg-red-600 hover:bg-red-500"
                        : "bg-yellow-900/40 hover:bg-yellow-800/60 border border-yellow-700/50"
                    }`}
                  >
                    {speaking ? <><FaStop /> Stop</> : <><FaVolumeUp /> Listen</>}
                  </button>
                )}

                {activeTab === "fir" && fir && (
                  <button
                    onClick={downloadFIR}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-yellow-500 hover:bg-yellow-400 text-black transition-all"
                  >
                    <FaDownload /> Download PDF
                  </button>
                )}
              </div>
            </div>

            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {activeTab === "advice" ? advice : fir}
            </div>
          </div>
        )}

        {/* Similar Cases */}
        {similarCases && (
          <div className="mt-6 bg-[#111118] border border-yellow-900/40 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-yellow-900/30">
              <FaBalanceScale className="text-yellow-500 text-xl" />
              <h3 className="text-yellow-400 font-bold tracking-wider uppercase text-sm">
                Case Analysis
              </h3>
            </div>

            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-2">Winning Probability</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-gray-800 rounded-full h-4">
                  <div
                    className="bg-yellow-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${similarCases.winning_chance}%` }}
                  />
                </div>
                <span className="text-yellow-400 font-bold text-xl">
                  {similarCases.winning_chance}%
                </span>
              </div>
            </div>

            <div className="mb-6 bg-yellow-900/20 rounded-xl p-4 border border-yellow-900/30">
              <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">
                Applicable Law
              </p>
              <p className="text-yellow-300 font-semibold">
                {similarCases.applicable_section}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">
                Recommended Action
              </p>
              <p className="text-gray-300 leading-relaxed">
                {similarCases.recommended_action}
              </p>
            </div>

            {similarCases.similar_cases && (
              <div>
                <p className="text-gray-400 text-xs mb-3 uppercase tracking-wider">
                  Similar Cases
                </p>
                <div className="space-y-2">
                  {similarCases.similar_cases.map((c, i) => (
                    <div
                      key={i}
                      className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-gray-300 text-sm"
                    >
                      📋 {c}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="relative z-10 text-center py-8 text-gray-600 text-xs tracking-widest border-t border-yellow-900/20">
        NYAY AI — Justice is Every Indian's Right ⚖️
      </footer>
    </div>
  );
}
