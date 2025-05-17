import { useState, useRef, useEffect, useCallback } from "react";

interface VolumeSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function VolumeSlider({ value, onChange }: VolumeSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const updateValue = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    onChange(Math.round(percentage));
  }, [onChange]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent track's onClick from firing when dragging starts on thumb
    setIsDragging(true);
    updateValue(e.clientX);
  }, [updateValue]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation(); // Prevent track's onTouch from firing when dragging starts on thumb
    setIsDragging(true);
    updateValue(e.touches[0].clientX);
  }, [updateValue]);

  const handleTrackMouseDown = useCallback((e: React.MouseEvent) => {
    updateValue(e.clientX);
  }, [updateValue]);

  const handleTrackTouchStart = useCallback((e: React.TouchEvent) => {
    updateValue(e.touches[0].clientX);
  }, [updateValue]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault(); // Prevent text selection while dragging
        updateValue(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        updateValue(e.touches[0].clientX);
        e.preventDefault(); // Prevent scrolling while dragging
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, updateValue]);

  return (
    <div className="relative w-full h-8 flex items-center touch-none select-none">
      {/* Track background */}
      <div
        ref={trackRef}
        className="absolute h-2 w-full rounded-full bg-gray-700 cursor-pointer"
        onMouseDown={handleTrackMouseDown}
        onTouchStart={handleTrackTouchStart}
      >
        {/* Filled track */}
        <div
          className="absolute h-full rounded-full bg-special-green transition-[width] duration-75"
          style={{ width: `${value}%` }}
        />
      </div>
      
      {/* Thumb */}
      <div
        ref={thumbRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className={`absolute w-4 h-4 rounded-full bg-white shadow-lg transform -translate-x-1/2 transition-[left] duration-75 cursor-grab ${
          isDragging ? 'cursor-grabbing scale-110' : 'hover:scale-110'
        }`}
        style={{ left: `${value}%` }}
      />
    </div>
  );
} 