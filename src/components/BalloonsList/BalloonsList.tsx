import { memo } from "react";
import { Balloon } from "./Balloon";
import { getColor } from "@/handlers";

const BallonsList = ({ type, list, handleSayOnClick }: { type: string, list: string[], handleSayOnClick: (arg: string) => void }) => list.map((letter, i) => {
    const color = getColor();
    return (
      <Balloon
        className="ballon-item"
        type={type}
        key={i}
        letter={letter}
        color={color}
        onClick={handleSayOnClick}
      />
    );
  })

  export default memo(BallonsList);