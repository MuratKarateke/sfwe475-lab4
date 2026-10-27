export type FilterType = "all" | "done" | "open";

type FilterBarProps = {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => onFilterChange("all")}
      >
        All
      </button>
      <button
        className={filter === "done" ? "active" : ""}
        onClick={() => onFilterChange("done")}
      >
        Done
      </button>
      <button
        className={filter === "open" ? "active" : ""}
        onClick={() => onFilterChange("open")}
      >
        Open
      </button>
    </div>
  );
}

export default FilterBar;
