import React, { useState } from "react";
import Game from "./Game";

const App = () => {
  const [score, setScore] = useState(0);
  return (
    <main>
      <Game setScore={setScore} />
      <div>Score {score}</div>
    </main>
  );
};

export default App;
