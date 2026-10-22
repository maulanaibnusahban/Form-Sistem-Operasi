import { useState, useEffect } from "react";
import FormField from "./components/FormField";
import SelectField from "./components/SelectField";
import SubmitButton from "./components/SubmitButton";
import AlertBox from "./components/AlertBox";
import SuccessCard from "./components/SuccessCard";
import BackgroundDecor from "./components/BackgroundDecor";
import { PROGRAM_STUDI_LIST, validateField, validateAll } from "./utils/validators";
import { submitResponden, checkHealth } from "./api/responden";

const INITIAL_FORM = {
  nama_lengkap: "",
  nim: "",
  email: "",
  no_hp: "",
  program_studi: "",
};

export default function App() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [healthStatus, setHealthStatus] = useState("checking"); // 'ok' | 'error' | 'checking'

  // Periksa koneksi backend saat mount
  useEffect(() => {
    async function verifyBackend() {
      try {
        const res = await checkHealth();
        if (res.ok && res.data?.status === "ok") {
          setHealthStatus("ok");
        } else {
          setHealthStatus("error");
        }
      } catch {
        setHealthStatus("error");
      }
    }
    verifyBackend();
  }, []);

  // Handler perubahan input dengan normalisasi instan
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "nim") {
      formattedValue = value.toUpperCase();
    } else if (name === "email") {
      formattedValue = value.toLowerCase();
    } else if (name === "no_hp") {
      formattedValue = value.replace(/\D/g, "").slice(0, 13);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Hapus error field saat user mengetik kembali
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }

    if (generalError) {
      setGeneralError("");
    }
  };

  // Handler saat input kehilangan fokus (onBlur)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);
    setFieldErrors((prev) => {
      const updated = { ...prev };
      if (errorMsg) {
        updated[name] = errorMsg;
      } else {
        delete updated[name];
      }
      return updated;
    });
  };

  // Handler Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    // 1. Validasi lokal komprehensif di sisi frontend
    const { isValid, errors, normalizedData } = validateAll(formData);
    if (!isValid) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. Kirim request ke backend melalui relative path /api/responden
      const res = await submitResponden(normalizedData);

      if (res.status === 201 && res.data?.success) {
        // Status 201: Berhasil disimpan
        setSuccessData(res.data.data);
        setFieldErrors({});
        setGeneralError("");
      } else if (res.status === 422 || res.status === 409) {
        // Status 422 (Validasi gagal) atau 409 (Conflict duplikat NIM/Email)
        if (res.data?.errors && typeof res.data.errors === "object") {
          setFieldErrors(res.data.errors);
        } else {
          setGeneralError(res.data?.message || "Data pendaftaran tidak valid.");
        }
      } else {
        // Status 500 atau respon gagal lainnya
        setGeneralError(res.data?.message || "Terjadi kesalahan pada server. Silakan coba beberapa saat lagi.");
      }
    } catch {
      // Kesalahan jaringan / network drop
      setGeneralError("Gagal mengirimkan formulir mohon hubungi admin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form untuk mendaftar lagi
  const handleResetForm = () => {
    setFormData(INITIAL_FORM);
    setFieldErrors({});
    setGeneralError("");
    setSuccessData(null);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between selection:bg-[#FFE500] selection:text-black">
      {/* 2. DEKORASI BENTUK GEOMETRIS NEO-BRUTALISM BACKGROUND */}
      <BackgroundDecor />

      {/* 3. KONTEN UTAMA */}
      <div className="w-full flex-1 flex flex-col justify-between items-center px-4 py-8 md:py-12">
        {/* Container Lebar Maksimum 640px */}
        <main className="w-full max-w-[640px] flex flex-col items-stretch space-y-6">
          {/* POSTER HEADER NEO-BRUTALISM */}
          <header className="border-[4px] border-black bg-[#FFE500] p-6 shadow-[8px_8px_0px_0px_#000000] relative">
            {/* STIKER / BADGE BINTANG PINK DI POJOK HEADER */}
            <div className="absolute -top-4 -right-3 sm:-top-5 sm:-right-4 z-20 rotate-12 bg-[#FF6B9D] text-white border-[3px] border-black px-2.5 py-1 font-mono font-black text-xs md:text-sm uppercase shadow-[4px_4px_0px_0px_#000000] flex items-center gap-1 select-none pointer-events-none">
              <span>★</span>
              <span>ISI DATA!</span>
              <span>★</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="bg-black text-[#FFE500] font-mono font-black text-xs px-2.5 py-1 tracking-widest uppercase border-[2px] border-black">
                AKADEMIK
              </span>
              <span className="bg-[#FF6B9D] text-white font-mono font-black text-xs px-2.5 py-1 tracking-wider uppercase border-[2px] border-black shadow-[2px_2px_0px_0px_#000000]">
                RESMI
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-black leading-none mb-3">
              FORM PENDAFTARAN
            </h1>

            <div className="border-t-[3px] border-black pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="font-mono text-xs md:text-sm font-bold uppercase text-black">
                Seminar Nasional Teknik Informatika (SEMNASTI)
              </p>
              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <span
                  className={`w-3 h-3 border border-black ${
                    healthStatus === "ok"
                      ? "bg-[#B8F500]"
                      : healthStatus === "error"
                        ? "bg-[#FF3B3B]"
                        : "bg-neutral-300 animate-pulse"
                  }`}
                />
                <span className="font-mono text-[11px] font-bold uppercase">
                  {healthStatus === "ok" ? "ONLINE" : healthStatus === "error" ? "DISCONNECTED" : "CHECKING..."}
                </span>
              </div>
            </div>
          </header>

          {/* ALERT BOX JIKA SERVER ERROR / JARINGAN GAGAL */}
          <AlertBox message={generalError} onClose={() => setGeneralError("")} />

          {/* TAMPILAN KONDISIONAL: SUCCESS CARD ATAU FORM PENDAFTARAN */}
          {successData ? (
            <SuccessCard data={successData} onReset={handleResetForm} />
          ) : (
            <div className="border-[4px] border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000000]">
              <div className="border-b-[3px] border-black pb-3 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 bg-black" />
                  <h2 className="font-heading text-lg sm:text-xl font-black uppercase tracking-tight">LENGKAPI BIODATA DIRI</h2>
                </div>
                <span className="font-mono text-xs font-black bg-black text-[#FFE500] px-2 py-0.5 border border-black shadow-[2px_2px_0px_0px_#000]">
                  (*) WAJIB DIISI
                </span>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* 1. NAMA LENGKAP */}
                <FormField
                  id="nama_lengkap"
                  label="1. Nama Lengkap"
                  type="text"
                  value={formData.nama_lengkap}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Contoh: Muhammad Maul"
                  error={fieldErrors.nama_lengkap}
                  maxLength={100}
                  showCounter={true}
                />

                {/* 2. NIM */}
                <FormField
                  id="nim"
                  label="2. Nomor Induk Mahasiswa (NIM)"
                  type="text"
                  value={formData.nim}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="A11.2025.16509"
                  error={fieldErrors.nim}
                  maxLength={20}
                />

                {/* 3. EMAIL */}
                <FormField
                  id="email"
                  label="3. Alamat Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="contoh@mahasiswa.ac.id"
                  error={fieldErrors.email}
                  maxLength={100}
                  showCounter={true}
                />

                {/* 4. NO HP */}
                <FormField
                  id="no_hp"
                  label="4. Nomor Handphone / WhatsApp"
                  type="tel"
                  value={formData.no_hp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="081234567890"
                  error={fieldErrors.no_hp}
                  maxLength={13}
                  inputMode="numeric"
                />

                {/* 5. PROGRAM STUDI */}
                <SelectField
                  id="program_studi"
                  label="5. Program Studi"
                  value={formData.program_studi}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={PROGRAM_STUDI_LIST}
                  placeholder="-- PILIH PROGRAM STUDI --"
                  error={fieldErrors.program_studi}
                />

                {/* TOMBOL SUBMIT */}
                <div className="pt-3">
                  <SubmitButton isSubmitting={isSubmitting} />
                </div>
              </form>
            </div>
          )}
        </main>

        {/* FOOTER BRUTALIST */}
        <footer className="mt-10 font-mono text-xs text-neutral-600 text-center flex flex-col items-center gap-1">
          <p className="font-bold text-black uppercase tracking-wider">Maulana Ibnu Sahban &copy; 2026</p>
          <p className="text-[11px]">Form Seminar Nasional Teknik Informatika (SEMNASTI)</p>
        </footer>
      </div>
    </div>
  );
}
