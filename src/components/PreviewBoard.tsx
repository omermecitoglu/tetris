import "~/styles/preview.scss";
import React from "react";
import type { TetrominoShape } from "~/core/tetromino";
import Preview from "./Preview";

type PreviewBoardProps = {
  list: TetrominoShape[],
};

const PreviewBoard = ({
  list,
}: PreviewBoardProps) => (
  <div className="preview-board">
    <h3 className="preview-board__header">
      NEXT
    </h3>
    <div className="preview-board__list">
      {list.map((shape, index) =>
        <div key={index}>
          <Preview shape={shape} />
        </div>
      )}
    </div>
  </div>
);

export default PreviewBoard;
