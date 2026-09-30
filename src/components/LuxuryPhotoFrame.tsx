import React, { useRef, useState } from 'react';
import { Camera, ImagePlus, Trash2, Eye, Sparkles } from 'lucide-react';
import { PhotoSlotKey } from '../types';

interface LuxuryPhotoFrameProps {
  label: string;
  slotKey: PhotoSlotKey;
  photoUrl: string | null;
  onPhotoChange: (slotKey: PhotoSlotKey, url: string | null) => void;
  aspectRatio?: '4/3' | '16/9' | '1/1';
  hint?: string;
  isAfterHours?: boolean;
}

export const LuxuryPhotoFrame: React.FC<LuxuryPhotoFrameProps> = ({
  label,
  slotKey,
  photoUrl,
  onPhotoChange,
  aspectRatio = '4/3',
  hint,
  isAfterHours = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert file to Data URL for instant local display and persistence
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onPhotoChange(slotKey, result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPhotoChange(slotKey, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '1/1'
      ? 'aspect-square'
      : 'aspect-[4/3]';

  return (
    <div className="w-full my-4">
      {/* Hidden file input for phone camera or gallery */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id={`photo-input-${slotKey}`}
      />

      <div
        className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden border transition-all duration-300 shadow-xl group ${
          isAfterHours
            ? 'border-[#D4AF37]/30 bg-[#16060c] shadow-black/80'
            : 'border-[#B87D6A]/35 bg-gradient-to-b from-[#E5B5A3] via-[#DCAC99] to-[#D5A38F] shadow-[0_8px_24px_rgba(145,80,60,0.12)]'
        }`}
      >
        {photoUrl ? (
          // Display uploaded/configured photo
          <div className="relative w-full h-full">
            <img
              src={photoUrl}
              alt={label}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle luxury vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

            {/* Corner Luxury Trim */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60 pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60 pointer-events-none" />

            {/* Action buttons overlay */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="p-2 rounded-full bg-black/60 backdrop-blur-md text-[#F5EFEB] hover:text-[#D4AF37] border border-[#D4AF37]/30 transition-colors shadow-md"
                title="Agrandir la photo"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-full bg-black/60 backdrop-blur-md text-[#F5EFEB] hover:text-[#D4AF37] border border-[#D4AF37]/30 transition-colors shadow-md"
                title="Changer la photo"
              >
                <ImagePlus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="p-2 rounded-full bg-black/60 backdrop-blur-md text-red-300 hover:text-red-400 border border-red-500/30 transition-colors shadow-md"
                title="Supprimer la photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          // Elegant luxury placeholder as requested by the user
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 hover:bg-[#DDA996]/50 active:scale-[0.99] focus:outline-none relative"
          >
            {/* Elegant double border ornament inside */}
            <div className="absolute inset-3 border border-dashed rounded-xl pointer-events-none border-[#B87D6A]/40" />

            {/* Monogram / Emblem */}
            <div className="relative mb-3 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full border flex items-center justify-center shadow-inner border-[#B87D6A]/50 bg-[#F0C9B9]">
                <Camera className="w-6 h-6 text-[#7D3442]" strokeWidth={1.4} />
              </div>
              <Sparkles className="w-3.5 h-3.5 absolute -top-1 -right-1 animate-pulse text-[#C46835]" />
            </div>

            {/* Exact label required */}
            <span className="font-serif text-sm md:text-base font-semibold tracking-wider uppercase px-3 py-1 text-[#38161D]">
              {label}
            </span>

            <span className="text-[11px] tracking-wide font-sans mt-1 text-[#5E2632]">
              {hint || 'Toucher pour importer depuis votre pellicule'}
            </span>

            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-medium tracking-wider uppercase transition-colors border-[#B87D6A]/50 bg-[#7D3442] text-[#FFF6F2] hover:bg-[#943F50] shadow-md">
              <ImagePlus className="w-3 h-3" />
              <span>Choisir une photo</span>
            </div>
          </button>
        )}
      </div>

      {/* Fullscreen Preview Modal */}
      {isPreviewOpen && photoUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className="relative max-w-lg max-h-[85vh] w-full flex flex-col items-center">
            <img
              src={photoUrl}
              alt={label}
              className="max-h-[75vh] w-auto rounded-xl object-contain shadow-2xl border border-[#D4AF37]/40"
            />
            <p className="mt-3 text-xs tracking-widest text-[#E8CFCD] font-serif uppercase">
              {label}
            </p>
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="mt-3 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-serif tracking-widest"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
