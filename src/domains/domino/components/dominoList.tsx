import { Domino } from "../models/dominoSet";

interface Props {
  dominoes: Domino[];
}

export default function DominoList({ dominoes }: Props) {
  return (
    <div className="flex flex-wrap gap-3 justify-center text-red-500">
      {dominoes.map(([a, b], i) => (
        <div
          key={i}
          className="w-16 h-20 bg-white border border-gray-400 rounded-lg shadow-md flex flex-col justify-between items-center text-lg font-medium"
        >
          <div className="py-1">{a}</div>
          <div className="w-full border-t border-gray-300"></div>
          <div className="py-1">{b}</div>
        </div>
      ))}
    </div>
  );
}
