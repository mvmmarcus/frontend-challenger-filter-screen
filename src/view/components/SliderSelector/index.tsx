import { useEffect, useRef, useState } from 'react';
import priceRangeBg from '../../../assets/price-range-bg.svg';

interface SliderSelectorProps {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  onChange: (minValue: number, maxValue: number) => void;
}

const rangeStep = 0.1;
const priceCap = 0;

export function SliderSelector({
  min,
  max,
  valueMin,
  valueMax,
  onChange,
}: SliderSelectorProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);
  const [minValue, setMinValue] = useState(valueMin);
  const [maxValue, setMaxValue] = useState(valueMax);

  const handleMinValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (Number(event.target.value) < maxValue) {
        setMinValue(Number(event.target.value));
        onChange(Number(event.target.value), maxValue);
      }
    } else {
      if (Number(event.target.value) < minValue) {
        setMinValue(Number(event.target.value));
        onChange(Number(event.target.value), maxValue);
      }
    }
  };

  const handleMaxValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (Number(event.target.value) > minValue) {
        setMaxValue(Number(event.target.value));
        onChange(minValue, Number(event.target.value));
      }
    } else {
      if (Number(event.target.value) > maxValue) {
        setMaxValue(Number(event.target.value));
        onChange(minValue, Number(event.target.value));
      }
    }
  };

  useEffect(() => {
    if (progressRef?.current && rangeRef?.current) {
      progressRef.current.style.left = `${minValue}%`;
      progressRef.current.style.right = `${max - maxValue}%`;
      rangeRef.current.style.width = `${maxValue - minValue}%`;
      rangeRef.current.style.left = `${minValue}%`;
    }
  }, [minValue, maxValue, max, onChange]);

  useEffect(() => {
    setMinValue(valueMin);
    setMaxValue(valueMax);
  }, [valueMin, valueMax]);

  return (
    <div className="flex flex-col relative">
      <div className="flex flex-col relative price-range-input-composite">
        <div
          ref={progressRef}
          className="progress absolute price-range-input-bg rounded bottom-0 top-0"
        />

        <img
          src={priceRangeBg}
          alt="price range background"
          className="w-full"
        />
      </div>

      <div>
        <div className="slider relative h-1 rounded-md">
          <div
            ref={rangeRef}
            className="progress absolute h-0.5 bg-colors-border-orange rounded w-full"
          ></div>
        </div>
        <div className="range-input relative">
          <input
            onChange={handleMinValue}
            type="range"
            value={minValue}
            min={min}
            step={rangeStep}
            max={max}
            className="range-min absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
          />
          <input
            onChange={handleMaxValue}
            type="range"
            value={maxValue}
            min={min}
            step={rangeStep}
            max={max}
            className="range-max absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
          />
        </div>

        <footer className="w-full flex items-center mt-4">
          <div className="flex w-16 h-10 bg-colors-bg-grey rounded-md items-center justify-center">
            <span className="font-normal text-colors-text-grey text-sm">
              {minValue}
            </span>
          </div>
          <div className="flex flex-1 h-0.5 bg-colors-bg-grey mx-3" />
          <div className="flex w-16 h-10 bg-colors-bg-grey rounded-md items-center justify-center">
            <span className="font-normal text-colors-text-grey text-sm">
              {maxValue}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
