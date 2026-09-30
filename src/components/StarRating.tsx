import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface StarRatingProps {
  value: number | null;
  onChange: (rating: number) => void;
  size?: 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  size = 'lg',
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const starSize = size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';

  const labels = [
    'Agréable',
    'Très doux',
    'Un délice',
    'Inoubliable',
    'La perfection absolue ♡',
  ];

  const handleSelect = (idx: number) => {
    soundEffects.playStarClick(idx);
    onChange(idx + 1);
  };

  const activeIndex = hovered !== null ? hovered : (value ? value - 1 : -1);

  return (
    <div className="flex flex-col items-center gap-3 my-4">
      <div className="flex items-center justify-center gap-3">
        {[0, 1, 2, 3, 4].map((starIdx) => {
          const isFilled = activeIndex >= starIdx;

          return (
            <button
              key={starIdx}
              type="button"
              onClick={() => handleSelect(starIdx)}
              onMouseEnter={() => setHovered(starIdx)}
              onMouseLeave={() => setHovered(null)}
              className="relative p-1 transition-transform duration-200 active:scale-125 focus:outline-none"
              aria-label={`Noter ${starIdx + 1} étoile${starIdx > 0 ? 's' : ''}`}
            >
              <Star
                className={`${starSize} transition-all duration-300 ${
                  isFilled
                    ? 'fill-[#C46835] text-[#C46835] drop-shadow-[0_0_10px_rgba(196,104,53,0.45)] scale-110'
                    : 'text-[#9E5F4B]/40 fill-transparent hover:text-[#C46835]'
                }`}
                strokeWidth={1.5}
              />
            </button>
          );
        })}
      </div>

      {/* Discrete poetic rating feedback */}
      <div className="h-6 flex items-center justify-center">
        {activeIndex >= 0 ? (
          <span className="text-xs uppercase tracking-widest text-[#692B38] font-serif font-semibold transition-opacity duration-300 drop-shadow-sm">
            {labels[activeIndex]}
          </span>
        ) : (
          <span className="text-xs tracking-wider text-[#692B38]/80 font-serif italic">
            Touchez les étoiles pour attribuer votre note
          </span>
        )}
      </div>
    </div>
  );
};
