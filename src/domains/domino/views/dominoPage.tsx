"use client";

import { useState } from "react";
import { DominoSet } from "../models/dominoSet";
import { defaultDominoes } from "../models/defaultDominos";
import { createDominoSet } from "../controllers/dominoController";
import DominoList from "../components/dominoList";
import DominoControls from "../components/dominoControls";

export default function DominoPage() {
  const [dominoSet, setDominoSet] = useState<DominoSet>(createDominoSet());

  const updateView = () => {
    setDominoSet(new DominoSet([...dominoSet.getDominoes()]));
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-blue-700 text-center">
          🎲 Domino Dashboard
        </h1>

        <div className="text-center text-gray-700">
          <p className="text-lg">
            Total Double Cards:{" "}
            <span className="font-semibold text-blue-600">
              {dominoSet.countDouble()}
            </span>
          </p>
        </div>

        <DominoList dominoes={dominoSet.getDominoes()} />

        <DominoControls
          onSort={(order) => {
            dominoSet.sort(order);
            updateView();
          }}
          onFlip={() => {
            dominoSet.flip();
            updateView();
          }}
          onRemoveDuplicates={() => {
            dominoSet.removeDuplicates();
            updateView();
          }}
          onRemoveTotal={(total) => {
            dominoSet.removeByTotal(total);
            updateView();
          }}
          onReset={() => {
            dominoSet.reset([...defaultDominoes]);
            updateView();
          }}
        />
      </div>
    </main>
  );
}
