import "./style/App.css";
import dice from "./public/icon-dice.svg";
import divider from "./public/pattern-divider-desktop.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
  const [quotes, setQuotes] = useState("");
  const [loading, setLoading] = useState(false);

  const fetch = () => {
    setLoading(true);
    setTimeout(() => {
      axios.get("https://api.adviceslip.com/advice").then((resp) => {
        setQuotes(resp.data.slip);
        setLoading(false);
      });
    }, 750);
  };

  useEffect(fetch, []);

  return (
    <motion.main
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="main"
    >
      <div className="container">
        <figure>
          <h1>advice #{loading ? "..." : quotes.id}</h1>
        </figure>
        <blockquote className="quotes">
          <p>{loading ? "Loading..." : `“${quotes.advice}”`}</p>
        </blockquote>
        <img className="divider" src={divider} alt="" />
        <div className="box-btn">
          <motion.button
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.05 }}
            aria-label="Aria Name"
            className="btn-rand"
            onClick={fetch}
          >
            <img src={dice} alt="" />
          </motion.button>
        </div>
      </div>
    </motion.main>
  );
}

export default App;
