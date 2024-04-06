"use client";
import React from "react";

type Props = {
  num: number;
  effects: string;
};
const LayerStyle = ({ num, effects }: Props) => {
  return (
    <style jsx global>{`
      img.layer-${num} {
        filter: ${effects};
        user-select: none;
      }
    `}</style>
  );
};

export default LayerStyle;
