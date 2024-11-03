import { memo } from "react";
import { Balloon } from "./Balloon";
import { getColor, handleSpeak } from "../handlers";

const BallonsList = ({ type, list }: { type: string, list: string[] }) => list.map((letter, i) => {
    const color = getColor();
    return (
      <Balloon
        className="ballon-item"
        type={type}
        key={i}
        letter={letter}
        color={color}
        onClick={handleSpeak}
      />
    );
  })

  export default memo(BallonsList);