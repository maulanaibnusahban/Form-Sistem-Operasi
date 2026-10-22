export default function BackgroundDecor() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 select-none" aria-hidden="true">
      {/* 1. Bentuk Kiri Atas: Kotak Kuning Berotasi -12° */}
      <div className="absolute top-20 -left-6 md:left-8 w-16 h-16 md:w-28 md:h-28 bg-[#FFE500] border-[4px] border-black shadow-[6px_6px_0px_0px_#000] -rotate-12 flex items-center justify-center transition-transform">
        <div className="w-6 h-6 md:w-10 md:h-10 border-[3px] border-black bg-white flex items-center justify-center font-mono font-black text-xs md:text-sm">
          +
        </div>
      </div>

      {/* 2. Bentuk Kiri Tengah: Lingkaran Pink Berotasi 6° (disembunyikan di layar kecil) */}
      <div className="hidden md:flex brutalist-circle absolute top-[440px] -left-8 md:left-10 w-24 h-24 md:w-32 md:h-32 bg-[#FF6B9D] border-[4px] border-black shadow-[6px_6px_0px_0px_#000] rotate-6 items-center justify-center">
        <div className="brutalist-circle w-10 h-10 border-[3px] border-black bg-black text-white flex items-center justify-center font-mono font-black text-xs">
          ★
        </div>
      </div>

      {/* 3. Bentuk Kiri Bawah: Kotak / Diamond Biru Berotasi 15° (layar besar) */}
      <div className="hidden lg:flex absolute bottom-24 -left-4 md:left-14 w-20 h-20 md:w-24 md:h-24 bg-[#4D96FF] border-[4px] border-black shadow-[6px_6px_0px_0px_#000] rotate-15 items-center justify-center">
        <span className="font-mono font-black text-white text-base tracking-tighter">#SO</span>
      </div>

      {/* 4. Bentuk Kanan Atas: Lingkaran Lime Berotasi 12° */}
      <div className="brutalist-circle absolute top-28 -right-6 md:right-10 w-16 h-16 md:w-28 md:h-28 bg-[#B8F500] border-[4px] border-black shadow-[6px_6px_0px_0px_#000] rotate-12 flex items-center justify-center">
        <div className="w-8 h-8 md:w-12 md:h-12 border-[3px] border-black bg-[#FFE500] flex items-center justify-center font-mono font-black text-sm">
          ⚡
        </div>
      </div>

      {/* 5. Bentuk Kanan Tengah: Kotak Pink Berotasi -8° (disembunyikan di layar kecil) */}
      <div className="hidden md:flex absolute top-[460px] -right-8 md:right-12 w-24 h-24 md:w-32 md:h-32 bg-[#FF6B9D] border-[4px] border-black shadow-[6px_6px_0px_0px_#000] -rotate-8 items-center justify-center">
        <div className="border-[3px] border-black bg-white px-2 py-1 font-mono font-black text-xs text-black">2026</div>
      </div>

      {/* 6. Bentuk Kanan Bawah: Kotak Biru / Lime Berotasi -15° (layar besar) */}
      <div className="hidden lg:flex absolute bottom-28 -right-4 md:right-16 w-20 h-20 md:w-24 md:h-24 bg-[#4D96FF] border-[4px] border-black shadow-[6px_6px_0px_0px_#000] -rotate-15 items-center justify-center">
        <div className="w-8 h-8 bg-black text-[#FFE500] flex items-center justify-center font-mono font-black text-sm">▲</div>
      </div>
    </div>
  );
}
