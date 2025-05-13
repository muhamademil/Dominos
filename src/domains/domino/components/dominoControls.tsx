import { useState } from "react";

interface Props {
  onSort: (order: "asc" | "desc") => void;
  onFlip: () => void;
  onRemoveDuplicates: () => void;
  onRemoveTotal: (total: number) => void;
  onReset: () => void;
}

export default function DominoControls({
  onSort,
  onFlip,
  onRemoveDuplicates,
  onRemoveTotal,
  onReset,
}: Props) {
  const [total, setTotal] = useState<number>(0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => onSort("asc")} className="btn">
          Sort Asc
        </button>
        <button onClick={() => onSort("desc")} className="btn">
          Sort Desc
        </button>
        <button onClick={onFlip} className="btn">
          Flip Cards
        </button>
        <button onClick={onRemoveDuplicates} className="btn">
          Remove Duplicates
        </button>
        <button onClick={onReset} className="btn-danger">
          Reset
        </button>
      </div>
      <div className="flex justify-center gap-2 items-center text-gray-500">
        <input
          type="number"
          value={total}
          onChange={(e) => setTotal(Number(e.target.value))}
          className="input"
          placeholder="Total to remove"
        />
        <button onClick={() => onRemoveTotal(total)} className="btn">
          Remove Total
        </button>
      </div>
    </div>
  );
}
