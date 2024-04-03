import { useState } from 'react';
import { Accordion } from '../../components/Accordion';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { SliderSelector } from '../../components/SliderSelector';
import { CloseIcon } from '../../components/icons/CloseIcon';
import { SearchIcon } from '../../components/icons/SearchIcon';
import { colorFilters, items } from './helpers';
import { cn } from '../../../app/utils/cn';

interface ColorAccordionContentProps {
  activeFilterColor: string;
  onSelectColor: (filterColor: string) => void;
}

function ColorAccordionContent({
  activeFilterColor,
  onSelectColor,
}: ColorAccordionContentProps) {
  const handleSelectColor = (filterColor: string) => {
    if (filterColor !== activeFilterColor) {
      onSelectColor(filterColor);
    } else {
      onSelectColor('');
    }
  };

  return (
    <div className="flex flex-wrap gap-1">
      {colorFilters.map((item) => {
        const isActiveFilterColor = item.bg === activeFilterColor;

        return (
          <Button
            key={item.value}
            onClick={() => handleSelectColor(item.bg)}
            className={cn(
              `bg-colors-filter-${item.bg} text-colors-text-${item.text}`,
              isActiveFilterColor && 'border-4 border-colors-border-orange'
            )}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
}

export function FilterPage() {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedFilterColor, setSelectedFilterColor] = useState('');
  const [priceRangeFilter, setPriceRangeFilter] = useState({
    min: 20,
    max: 80,
  });

  const handleResetAllFilters = () => {
    setSearchFilter('');
    setSelectedFilterColor('');
    setPriceRangeFilter({ min: 0, max: 100 });
  };

  const filteredItems = items
    .filter((item) =>
      searchFilter ? item.price.toFixed(2).includes(searchFilter) : true
    )
    .filter((item) =>
      selectedFilterColor ? item.bg === selectedFilterColor : true
    )
    .filter(
      (item) =>
        item.price >= priceRangeFilter.min && item.price <= priceRangeFilter.max
    );

  return (
    <main className="min-w-full min-h-full bg-white grid grid-cols-[1fr] sm:grid-cols-[0.4fr_0.6fr] lg:grid-cols-[0.3fr_0.7fr] xl:grid-cols-[0.2fr_0.8fr]">
      <div className="h-full w-ful border-r border-colors-border-grey">
        <div className="flex justify-center items-start flex-col gap-4 p-5 border-b border-colors-border-grey">
          <div className="w-full flex items-center justify-between">
            <p className="text-colors-text-blue font-medium text-xl">
              Filter by:
            </p>
            <Button
              variant="outlined"
              size="small"
              icon={<CloseIcon />}
              onClick={handleResetAllFilters}
            >
              RESET ALL
            </Button>
          </div>
          <Input
            name="search"
            placeholder="Search"
            icon={<SearchIcon />}
            value={searchFilter}
            onClear={() => setSearchFilter('')}
            onChange={(event) => setSearchFilter(event.target.value)}
          />
        </div>
        <div className="border-b border-colors-border-grey">
          <Accordion
            title="COLOR"
            content={
              <ColorAccordionContent
                activeFilterColor={selectedFilterColor}
                onSelectColor={setSelectedFilterColor}
              />
            }
          />
        </div>
        <div className="border-b border-colors-border-grey p-5">
          <p className="text-colors-text-blue font-medium text-base">PRICE</p>
          <SliderSelector
            min={0}
            max={100}
            valueMin={priceRangeFilter.min}
            valueMax={priceRangeFilter.max}
            onChange={(min, max) => setPriceRangeFilter({ min, max })}
          />
        </div>
      </div>
      <div className="h-full w-ful p-5">
        <p className="text-colors-text-blue font-medium text-base mb-4">
          ITEMS ({filteredItems.length})
        </p>
        {filteredItems.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {filteredItems.map((item) => (
              <div
                key={item.price}
                className={`w-auto h-10 flex justify-center items-center text-white rounded-md px-[10px] py-3 bg-colors-filter-${item.bg}`}
              >
                <span
                  className={`font-normal text-sm text-colors-text-${item.color}`}
                >
                  {item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-colors-text-blue">No items found :/</p>
        )}
      </div>
    </main>
  );
}
