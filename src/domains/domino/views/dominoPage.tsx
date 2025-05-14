"use client";

import { useState, useEffect } from "react";
import { DominoSet } from "../models/dominoSet";
import { defaultDominoes } from "../models/defaultDominos";
import { createDominoSet } from "../controllers/dominoController";
import DominoList from "../components/dominoList";
import DominoControls from "../components/dominoControls";

const dominoData = "dominoes";

export default function DominoPage() {
  const [dominoSet, setDominoSet] = useState<DominoSet | null>(null);
  const [isRender, setisRender] = useState(false);

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    const stored = localStorage.getItem(dominoData);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setDominoSet(new DominoSet(parsed));
      } catch (e) {
        console.error("Failed to parse dominoes from localStorage", e);
        setDominoSet(createDominoSet());
      }
    } else {
      setDominoSet(createDominoSet());
    }

    setisRender(true);
  }, []);

  // Save to localStorage every time dominoSet changes
  useEffect(() => {
    if (isRender && dominoSet) {
      localStorage.setItem(
        dominoData,
        JSON.stringify(dominoSet.getDominoes())
      );
    }
  }, [dominoSet, isRender]);

  const updateView = () => {
    if (dominoSet) {
      setDominoSet(new DominoSet([...dominoSet.getDominoes()]));
    }
  };

  const handleReset = () => {
    const newSet = new DominoSet([...defaultDominoes]);
    setDominoSet(newSet);
    localStorage.removeItem(dominoData);
  };

  // Don't render anything until mounted (to prevent hydration error)
  if (!isRender || !dominoSet) return null;

  return (
    <main className="min-h-screen bg-blue-950 py-10 px-4">
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
          onReset={handleReset}
        />
      </div>
    </main>
  );
}
