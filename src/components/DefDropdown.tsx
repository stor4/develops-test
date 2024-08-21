import React, { useState } from 'react';

interface DefDropdownProps {
  data: any
  title?: string;
  onSelect: (value: string) => void;
  setId?: (id: string) => void;
}

const DefDropdown: React.FC<DefDropdownProps> = ({
  data,
  title = 'Choose',
  onSelect,
  setId,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chosen, setChosen] = useState<string>(title);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const setItem = (item: string, id?: string) => {
    setChosen(item);
    setIsOpen(false);
    onSelect(item);
    if (setId && id) {
      setId(id);
    }
  };

  const renderItems = (item: { MakeName?: string; MakeId?: string } | string, key: number) => {
    if (typeof item === 'object' && item !== null) {
      return (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setItem(item.MakeName || '', item.MakeId);
          }}
          key={key}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {item.MakeName}
        </a>
      );
    } else {
      return (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setItem(item);
          }}
          key={key}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {item}
        </a>
      );
    }
  };

  return (
    <div className="relative max-w-[300px] min-w-[165px]">
      <button
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
        onClick={toggleDropdown}
      >
        {chosen}
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 w-full mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
          <div className="py-1 max-h-[250px] overflow-auto">
            {data &&
              data.map((item, key) => (
                <div key={key}>{renderItems(item, key)}</div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DefDropdown;
