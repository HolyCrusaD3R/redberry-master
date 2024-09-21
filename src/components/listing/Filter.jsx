export default function Filter({
  children,
  deleteFilter,
  data,
  regionName,
  type,
}) {
  function handleDelete() {
    if (type === "region") {
      deleteFilter(data.filter((item) => item !== regionName));
    } else if (type === "price" || type === "area") {
      deleteFilter({ min: 0, max: 0 });
    } else {
      deleteFilter(0);
    }
  }

  return (
    <div className="flex items-center gap-1 text-[#354451] p-2 border rounded-full border-black/10">
      <span>{children}</span>
      <button
        onClick={handleDelete}
        className="transition-opacity duration-150 hover:opacity-70"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#354451"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
