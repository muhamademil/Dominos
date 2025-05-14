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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0) {
      // toast.error("Total cannot be less than 0!");
      setTotal(0); // Reset to 0
    } else {
      setTotal(value);
    }
  };
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
          onChange={handleInputChange}
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