export default function SubmitButton({ isSubmitting, text = "KIRIM PENDAFTARAN", loadingText = "MENGIRIM..." }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full py-4 px-6 text-black font-black text-base md:text-lg tracking-wider uppercase border-[3px] border-black transition-all duration-150 flex items-center justify-center gap-3 select-none
        ${
          isSubmitting
            ? "bg-neutral-300 cursor-not-allowed shadow-[2px_2px_0px_0px_#000000] translate-x-[3px] translate-y-[3px]"
            : "bg-[#FFE500] hover:bg-[#FFD700] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#000000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none shadow-[6px_6px_0px_0px_#000000] cursor-pointer"
        }
      `}
    >
      {isSubmitting ? (
        <>
          <span className="inline-block w-4 h-4 border-[3px] border-black border-t-transparent animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <span>{text}</span>
          <span className="text-xl">➔</span>
        </>
      )}
    </button>
  );
}
