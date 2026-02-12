import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import musicFile from "./Athéna.mp3";

function App() {
  const [accepted, setAccepted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState({ top: 0, left: 0 });
  const [isEscaping, setIsEscaping] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [isTimingSyncing, setIsTimingSyncing] = useState(false);
  const [recordedTimings, setRecordedTimings] = useState([]);

  const audioRef = useRef(new Audio(musicFile));

  // Paroles avec timing en secondes (ajuste selon ta musique)
  const lyrics = [
    {
      text: "Pour de vrai, de vrai, de vrai, de vrai, de vrai, de vrai",
      time: 0.83,
    },
    { text: "Pour de vrai, de vrai, de vrai", time: 3.75 },
    {
      text: "Pour de vrai, de vrai, de vrai, de vrai, de vrai, de vrai, de vrai, de vrai, de vrai, de vrai",
      time: 5.42,
    },
    { text: "Pour de vrai, de vrai, de vrai", time: 8.9 },
    {
      text: "Pour de vrai, de vrai, de vrai, de vrai, de vrai, de vrai, de vrai, de vrai, de vrai, de vrai",
      time: 10.59,
    },
    { text: "Pour de vrai, de vrai, de vrai", time: 12.93 },
    {
      text: "Pour de vrai, de vrai, de vrai, de vrai, de vrai, de vrai, de vrai, de vrai, de vrai, de vrai",
      time: 16.56,
    },
    {
      text: "À quoi ça sert de dire, 'Je t'aime', si j'ai jamais vraiment dit pourquoi?",
      time: 17.79,
    },
    {
      text: "Parce que t'as su rester la même, tu m'as sauvé d'tellement d'mauvais choix",
      time: 20.34,
    },
    {
      text: "Parce que je sais qu'tu t'sous estimes, tu ris trop fort et la pièce s'illumine",
      time: 24.49,
    },
    { text: "Tu fais des concessions sans les souligner", time: 28.7 },
    { text: "Héroïne de tous les dessins animés", time: 30.81 },
    {
      text: "Parce que t'avoues simplement quand t'as tort (t'as tort, t'as tort)",
      time: 33.95,
    },
    {
      text: "Dis, 'Je t'aime' à tes parents, chaque fois qu'tu raccroches",
      time: 36.67,
    },
    { text: "Parce que c'est ton coeur qui choisit tes potes", time: 41.57 },
    { text: "T'arrives à m'rassurer quand j'ai peur de la mort", time: 45.6 },
    {
      text: "Ton intelligence est pure, tu manipules personne (personne, personne)",
      time: 49.7,
    },
    {
      text: "Quand on t'arrête dans la rue, tu discutes, jamais tu juges personne (personne, personne)",
      time: 54.43,
    },
    { text: "J'pourrais chanter tous tes défauts (ouais)", time: 58.76 },
    { text: "Tu rigoles et m'tappes juste sur l'épaule (ouais)", time: 61.0 },
    { text: "Parce que j'aime mieux quand t'es là", time: 62.76 },
    { text: "Tu m'protèges et guides mes pas, Athéna", time: 64.41 },
    { text: "Le noir de mon âme", time: 79.33 },
    { text: "Sera jamais si profond que le noir de tes pupilles", time: 85.65 },
    { text: "Le noir de mon âme", time: 90.06 },
    { text: "Sera jamais si négatif que toi t'es lucide", time: 95.03 },
    {
      text: "Et des fois j'suis stupide, j'oublie d'te dire l'essentiel",
      time: 99.84,
    },
    {
      text: "J'sais qu'tu doutes de toi-même, t'as peur d'être normale, t'as peur d'être moyenne",
      time: 101.69,
    },
    {
      text: "Mais t'es pas dans l'public, cette fois t'es sur la scène",
      time: 107.08,
    },
    {
      text: "Et crois-moi, je sais, pourquoi je t'aime, dix ans m'le rappelle",
      time: 112.19,
    },
    {
      text: "J'ai jamais tout gâché (j'ai jamais tout gâché, jamais tout gâché)",
      time: 116.14,
    },
    { text: "J'ai jamais tout gâché", time: 118.68 },
    { text: "Le noir de mon âme", time: 124.81 },
    {
      text: "Sera jamais si profond que le noir de tes pupilles",
      time: 136.77,
    },
    { text: "Le noir de mon âme", time: 141.7 },
    { text: "Sera jamais si négatif que toi t'es lucide", time: 145.16 },
    { text: "Athéna", time: 149.53 },
  ];

  const moveNoButton = () => {
    setIsEscaping(true);

    const buttonWidth = 120;
    const buttonHeight = 50;

    const newTop = Math.random() * (window.innerHeight - buttonHeight);
    const newLeft = Math.random() * (window.innerWidth - buttonWidth);

    setNoPosition({ top: newTop, left: newLeft });
    setAttempts((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setAccepted(true);
    if (!musicStarted) {
      audioRef.current.loop = true;
      audioRef.current.play();
      setMusicStarted(true);
    }
  };

  useEffect(() => {
    if (accepted) {
      const handleTimeUpdate = () => {
        const currentTime = audioRef.current.currentTime;
        // Trouve la ligne actuelle en fonction du temps
        for (let i = lyrics.length - 1; i >= 0; i--) {
          if (currentTime >= lyrics[i].time) {
            setCurrentLine(i);
            break;
          }
        }
      };

      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [accepted, lyrics]);

  return (
    <AnimatePresence>
      {!accepted ? (
        <motion.div
          className="container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Est-ce que tu veux être ma Valentine ? 💖
          </motion.h1>

          <p>Tentatives de refus : {attempts}</p>

          <div className="buttons">
            <motion.button
              className="yes"
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px #ff9aa2" }}
              animate={{ scale: 1 + attempts * 0.1 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={handleYesClick}
            >
              Oui ❤️
            </motion.button>

            <button
              className="no"
              style={
                isEscaping
                  ? {
                      position: "fixed",
                      top: noPosition.top,
                      left: noPosition.left,
                    }
                  : {}
              }
              onMouseEnter={moveNoButton}
            >
              Non 😢
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="success-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="hearts">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="heart"
                style={{
                  left: Math.random() * 100 + "vw",
                  animationDuration: 3 + Math.random() * 5 + "s",
                  fontSize: 20 + Math.random() * 20 + "px",
                }}
              >
                ❤️
              </div>
            ))}
          </div>

          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          >
            JE SAVAIS QUE TU DIRAIS OUI 💘✨
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Tu viens officiellement de rendre ma journée parfaite ❤️
          </motion.p>

          <div className="lyrics">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLine}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {lyrics[currentLine].text}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
