export const PROGRAM_STUDI_LIST = [
  'Teknik Informatika',
  'Sistem Informasi',
  'Desain Komunikasi Visual',
  'Ilmu Komunikasi',
  'Manajemen',
  'Akuntansi',
];

export const REGEX_PATTERNS = {
  nama_lengkap: /^[A-Za-z][A-Za-z .'-]{2,99}$/,
  nim: /^[A-Z]\d{2}\.\d{4}\.\d{5}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  no_hp: /^08\d{8,11}$/,
};

/**
 * Normalisasi data sebelum validasi.
 * Memastikan setiap input bertipe string dan aman.
 */
export function normalizeData(raw = {}) {
  const safeString = (val) => (typeof val === 'string' ? val.trim() : '');

  const nama_lengkap = safeString(raw.nama_lengkap);
  const nim = safeString(raw.nim).toUpperCase();
  const email = safeString(raw.email).toLowerCase();
  const no_hp = safeString(raw.no_hp);
  const program_studi = safeString(raw.program_studi);

  return {
    nama_lengkap,
    nim,
    email,
    no_hp,
    program_studi,
  };
}

/**
 * Validasi data pendaftaran responden.
 * Mengembalikan { isValid, errors, normalized }
 */
export function validateResponden(data = {}) {
  const errors = {};

  // Validasi tipe data dasar (tolak jika bukan object/bukan string di field)
  const fields = ['nama_lengkap', 'nim', 'email', 'no_hp', 'program_studi'];
  for (const field of fields) {
    if (data[field] !== undefined && typeof data[field] !== 'string') {
      errors[field] = `${field} harus berupa teks (string)`;
    }
  }

  // Jika ada field dengan tipe bukan string, langsung return error
  if (Object.keys(errors).length > 0) {
    return {
      isValid: false,
      errors,
      normalized: normalizeData(data),
    };
  }

  const normalized = normalizeData(data);

  // 1. Validasi nama_lengkap
  if (!normalized.nama_lengkap) {
    errors.nama_lengkap = 'Nama lengkap wajib diisi';
  } else if (normalized.nama_lengkap.length < 3 || normalized.nama_lengkap.length > 100) {
    errors.nama_lengkap = 'Nama lengkap harus antara 3 hingga 100 karakter';
  } else if (!REGEX_PATTERNS.nama_lengkap.test(normalized.nama_lengkap)) {
    errors.nama_lengkap = 'Nama lengkap hanya boleh berisi huruf, spasi, titik, apostrof, dan tanda hubung';
  }

  // 2. Validasi nim
  if (!normalized.nim) {
    errors.nim = 'NIM wajib diisi';
  } else if (!REGEX_PATTERNS.nim.test(normalized.nim)) {
    errors.nim = 'Format NIM tidak valid (contoh format: A11.2025.16509)';
  }

  // 3. Validasi email
  if (!normalized.email) {
    errors.email = 'Email wajib diisi';
  } else if (normalized.email.length > 100) {
    errors.email = 'Email maksimal 100 karakter';
  } else if (!REGEX_PATTERNS.email.test(normalized.email)) {
    errors.email = 'Format email tidak valid (contoh: user@domain.com)';
  }

  // 4. Validasi no_hp
  if (!normalized.no_hp) {
    errors.no_hp = 'Nomor HP wajib diisi';
  } else if (!REGEX_PATTERNS.no_hp.test(normalized.no_hp)) {
    errors.no_hp = 'Nomor HP harus diawali 08 dan memiliki panjang 10-13 digit angka';
  }

  // 5. Validasi program_studi
  if (!normalized.program_studi) {
    errors.program_studi = 'Program studi wajib dipilih';
  } else if (!PROGRAM_STUDI_LIST.includes(normalized.program_studi)) {
    errors.program_studi = 'Program studi tidak valid atau tidak terdaftar dalam pilihan';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    normalized,
  };
}
