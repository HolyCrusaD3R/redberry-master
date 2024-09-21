export default function Modal({ onClose, onDelete }) {
  return (
    <>
      <div className="fixed -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 top-1/2 rounded-xl shadow-[5px_5px_12px_0px_#02152614] py-12 px-32 flex flex-col gap-8 z-[9999]">
        <button
          className="absolute cursor-pointer top-4 right-4 hover:opacity-60"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>

        <p className="text-[#2D3648] text-2xl">გსურთ წაშალოთ ლისტინგი?</p>
        <div className="flex items-center justify-around gap-2">
          <button
            onClick={onClose}
            className="text-[#F93B1D] border border-[#F93B1D] p-4 hover:opacity-80 transition-opacity duration-150 rounded-xl"
          >
            გაუქმება
          </button>
          <button
            onClick={onDelete}
            className="text-white bg-[#F93B1D] p-4 rounded-xl transition-opacity duration-150 hover:opacity-80"
          >
            დადასტურება
          </button>
        </div>
      </div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]"
      ></div>
    </>
  );
}
