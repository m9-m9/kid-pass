"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextInput,
  Paper,
  List,
  Pill,
  Group,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

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

  const handleRemoveItem = (itemToRemove: SearchItem) => {
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
    <Box pos="relative" ref={containerRef}>
      <TextInput
        value={displayValue()}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={handleInputClick}
        placeholder={placeholder}
        leftSection={<IconSearch size={16} stroke={1.5} />}
        styles={{
          wrapper: {
            width: "100%",
          },
        }}
        size="md"
      />

      {/* Multi 모드에서 선택된 아이템 태그 표시 */}
      {mode === "multi" && selected.length > 0 && (
        <Group gap="xs" mt="xs" wrap="wrap">
          {selected.map((item) => (
            <Pill
              key={item.id}
              withRemoveButton
              onRemove={() => handleRemoveItem(item)}
            >
              {item.name}
            </Pill>
          ))}
        </Group>
      )}

      {isOpen && (
        <Paper
          shadow="md"
          mt={5}
          p={0}
          pos="absolute"
          w="100%"
          withBorder
          h={300}
          style={{ zIndex: 100, overflowY: "auto" }}
        >
          <List spacing="xs" size="sm" p="xs">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <List.Item key={item.id} onClick={() => handleItemSelect(item)}>
                  <UnstyledButton
                    w="100%"
                    p="xs"
                    style={{
                      borderRadius: "4px",
                      backgroundColor: isItemSelected(item)
                        ? "var(--mantine-color-blue-0)"
                        : "transparent",
                    }}
                  >
                    <Text fw={isItemSelected(item) ? 600 : 400}>
                      {item.name}
                    </Text>
                  </UnstyledButton>
                </List.Item>
              ))
            ) : (
              <List.Item>
                <Text c="dimmed" ta="center" p="xs">
                  검색 결과가 없습니다
                </Text>
              </List.Item>
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchListPicker;
