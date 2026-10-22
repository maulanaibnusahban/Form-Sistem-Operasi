export default function AlertBox({ message, onClose }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="w-full border-[3px] border-black bg-[#FF3B3B] text-white p-4 shadow-[5px_5px_0px_0px_#000000] mb-6 flex items-start justify-between gap-3"
    >
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 bg-black text-[#FF3B3B] border-[2px] border-white flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
          !
        </div>
        <div className="text-left">
          <p className="font-mono font-black text-xs uppercase tracking-wider text-black bg-white inline-block px-1.5 py-0.5 mb-1">
            PERINGATAN SISTEM
          </p>
          <p className="font-mono text-xs md:text-sm font-bold text-white leading-relaxed">{message}</p>
        </div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup pesan peringatan"
          className="border-[2px] border-black bg-white text-black hover:bg-neutral-200 w-7 h-7 flex items-center justify-center font-black text-sm cursor-pointer shadow-[2px_2px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all shrink-0"
        >
          ✕
        </button>
      )}
    </div>
  );
}
