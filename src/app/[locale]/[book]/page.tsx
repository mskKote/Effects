import React from "react";

export default function Book({ params }: { params: { book: string } }) {
  return <div>Произведение {params.book}</div>;
}
