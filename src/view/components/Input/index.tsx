import {
  ComponentProps,
  ReactNode,
  forwardRef,
  useEffect,
  useState,
} from 'react';

import { cn } from '../../../app/utils/cn';
import { CloseIcon } from '../icons/CloseIcon';

interface InputProps extends ComponentProps<'input'> {
  name: string;
  icon?: ReactNode;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { placeholder, name, id, icon, className, value, type, onClear, ...props },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value);

    const inputId = id ?? name;

    const handleClear = () => {
      if (onClear) onClear();

      setInputValue('');
    };

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    return (
      <div className="relative w-full">
        {icon && <div className="absolute left-[10px] top-3">{icon}</div>}

        <input
          {...props}
          value={inputValue}
          ref={ref}
          type={type}
          id={inputId}
          name={name}
          placeholder={placeholder}
          className={cn(
            `w-full bg-colors-bg-grey rounded-md px-[10px] h-[40px] placeholder-colors-text-grey 
            py-3 peer transition-all font-normal text-colors-text-blue`,
            icon && 'px-8',
            className
          )}
        />

        {!!inputValue && type !== 'tel' && (
          <div
            role="button"
            className="absolute right-[10px] top-3"
            onClick={handleClear}
          >
            <CloseIcon />
          </div>
        )}
      </div>
    );
  }
);

// forwardRef não consegue entender o nome do componente
Input.displayName = 'Input';
