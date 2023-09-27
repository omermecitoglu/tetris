import React, { useState } from "react";
import { type Cells } from "~/core/game";
import GameBoard from "./GameBoard";

const App = () => {
  const [renderedCells, setRenderedCells] = useState<Cells>(Array(200).fill(null));
  return <GameBoard columns={10} rows={20} size={32} cells={renderedCells} />;
};

export default App;
