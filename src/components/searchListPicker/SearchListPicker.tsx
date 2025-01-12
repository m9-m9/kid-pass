"use client";

import React, { useState, useRef, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import styles from "./searchListPicker.module.css";

export interface SearchItem {
  id: string;
  name: string;
  [key: string]: any;
}

interface SearchListPickerProps {
  items: SearchItem[];
  mode: "single" | "multi";
  selectedItems?: SearchItem | SearchItem[];
  onSelect: (items: SearchItem | SearchItem[]) => void;
  placeholder?: string;
  maxSelect?: number; // multi 모드에서 최대 선택 가능 개수
}

const SearchListPicker = ({
  items,
  mode = "single",
  selectedItems,
  onSelect,
  placeholder = "검색어를 입력하세요",
  maxSelect,
}: SearchListPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const containerRef = useRef<HTMLDivElement>(null);

  // 선택된 아이템들을 배열로 관리
  const selected = Array.isArray(selectedItems)
    ? selectedItems
    : selectedItems
    ? [selectedItems]
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const isItemSelected = (item: SearchItem) => {
    return selected.some((selectedItem) => selectedItem.id === item.id);
  };

  const handleItemSelect = (item: SearchItem) => {
    if (mode === "single") {
      onSelect(item);
      setSearchTerm("");
      setIsOpen(false);
    } else {
      const isSelected = isItemSelected(item);
      let newSelected: SearchItem[];

      if (isSelected) {
        newSelected = selected.filter(
          (selectedItem) => selectedItem.id !== item.id
        );
      } else {
        if (maxSelect && selected.length >= maxSelect) {
          return; // 최대 선택 개수 제한
        }
        newSelected = [...selected, item];
      }

      onSelect(newSelected);
      setSearchTerm("");
    }
  };

  const handleRemoveItem = (
    itemToRemove: SearchItem,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    if (mode === "multi") {
      const newSelected = selected.filter(
        (item) => item.id !== itemToRemove.id
      );
      onSelect(newSelected);
    }
  };

  const displayValue = () => {
    if (mode === "single") {
      return (selectedItems as SearchItem)?.name || searchTerm;
    }
    return searchTerm;
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          value={displayValue()}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={handleInputClick}
          placeholder={placeholder}
        />
        {/* <RemixIcon className={styles.searchIcon} size={20} /> */}
        <i className={`ri-search-line ${styles.searchIcon}`} />
      </div>

      {/* Multi 모드에서 선택된 아이템 태그 표시 */}
      {mode === "multi" && selected.length > 0 && (
        <div className={styles.selectedTags}>
          {selected.map((item) => (
            <span key={item.id} className={styles.tag}>
              {item.name}
              {/* <X
                size={14}
                className={styles.removeIcon}
                onClick={(e) => handleRemoveItem(item, e)}
              /> */}
              <i
                className={`ri-close-line removeIcon`}
                onClick={(e) => handleRemoveItem(item, e)}
              />
            </span>
          ))}
        </div>
      )}

      {isOpen && (
        <ul className={styles.dropdown}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <li
                key={item.id}
                className={`${styles.item} ${
                  isItemSelected(item) ? styles.selected : ""
                }`}
                onClick={() => handleItemSelect(item)}
              >
                {item.name}
              </li>
            ))
          ) : (
            <li className={styles.noResults}>검색 결과가 없습니다</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchListPicker;
