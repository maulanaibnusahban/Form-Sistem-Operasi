export default function SuccessCard({ data, onReset }) {
  if (!data) return null;

  return (
    <div className="w-full border-[4px] border-black bg-white shadow-[8px_8px_0px_0px_#000000] p-6 md:p-8 text-left animate-fadeIn">
      {/* Top Banner / Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-[3px] border-black pb-4 mb-6">
        <div className="bg-[#B8F500] border-[3px] border-black px-3 py-1 font-mono text-xs md:text-sm font-black uppercase shadow-[3px_3px_0px_0px_#000000]">
          PENDAFTARAN SUKSES!
        </div>
        <div className="bg-[#FF6B9D] text-white border-[2px] border-black px-2.5 py-0.5 font-mono text-xs font-black shadow-[2px_2px_0px_0px_#000000]">
          ID #{data.id || "N/A"}
        </div>
      </div>

      {/* Main Announcement */}
      <div className="mb-6">
        <h2 className="font-heading text-2xl md:text-3xl font-black uppercase tracking-tight text-black leading-none mb-2">
          TERIMA KASIH, DATA DITERIMA!
        </h2>
        <p className="font-mono text-xs md:text-sm text-neutral-700">
          Anda telah berhasil mendaftar Seminar Nasional Teknik Informatika (SEMNASTI) berikut ringkasan pendaftaran Anda:
        </p>
      </div>

      {/* Summary Table / Card */}
      <div className="border-[3px] border-black bg-[#FFFDF5] p-4 mb-6 shadow-[4px_4px_0px_0px_#000000] space-y-3 font-mono text-xs md:text-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b-2 border-dashed border-black/30">
          <span className="font-bold text-neutral-600 uppercase">Nama Lengkap</span>
          <span className="font-black text-black break-words">{data.nama_lengkap}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b-2 border-dashed border-black/30">
          <span className="font-bold text-neutral-600 uppercase">NIM</span>
          <span className="font-black text-black bg-[#FFE500] px-1 border border-black inline-block sm:inline">{data.nim}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b-2 border-dashed border-black/30">
          <span className="font-bold text-neutral-600 uppercase">Email</span>
          <span className="font-black text-black break-words">{data.email}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b-2 border-dashed border-black/30">
          <span className="font-bold text-neutral-600 uppercase">No. WhatsApp / HP</span>
          <span className="font-black text-black">{data.no_hp}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between py-1">
          <span className="font-bold text-neutral-600 uppercase">Program Studi</span>
          <span className="font-black text-black bg-[#4D96FF] text-white px-1.5 py-0.5 border border-black inline-block sm:inline">
            {data.program_studi}
          </span>
        </div>
      </div>

      {/* Action Button: Daftar Lagi */}
      <button
        type="button"
        onClick={onReset}
        className="w-full py-3.5 px-6 bg-[#B8F500] hover:bg-[#a6de00] text-black font-black text-base md:text-lg uppercase tracking-wider border-[3px] border-black shadow-[6px_6px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#000000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
      >
        <span>SELESAI</span>
        <span className="text-xl">↺</span>
      </button>
    </div>
  );
}
