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
 * Normalisasi satu field sebelum divalidasi atau disimpan
 */
export function normalizeField(name, value) {
  if (typeof value !== 'string') return '';
  switch (name) {
    case 'nama_lengkap':
      return value; // trim dilakukan saat validasi / submit
    case 'nim':
      return value.toUpperCase().trim();
    case 'email':
      return value.toLowerCase().trim();
    case 'no_hp':
      // hanya izinkan digit angka, maksimal 13 karakter
      return value.replace(/\D/g, '').slice(0, 13);
    case 'program_studi':
      return value.trim();
    default:
      return value;
  }
}

/**
 * Validasi satu field tertentu (berguna saat onBlur)
 */
export function validateField(name, value) {
  const val = typeof value === 'string' ? value.trim() : '';

  switch (name) {
    case 'nama_lengkap':
      if (!val) return 'Nama lengkap wajib diisi';
      if (val.length < 3 || val.length > 100) return 'Nama lengkap harus antara 3 hingga 100 karakter';
      if (!REGEX_PATTERNS.nama_lengkap.test(val)) {
        return 'Nama lengkap hanya boleh berisi huruf, spasi, titik, apostrof, dan tanda hubung';
      }
      return null;

    case 'nim':
      if (!val) return 'NIM wajib diisi';
      if (!REGEX_PATTERNS.nim.test(val.toUpperCase())) {
        return 'Format NIM tidak valid (contoh format: A11.2025.16509)';
      }
      return null;

    case 'email':
      if (!val) return 'Email wajib diisi';
      if (val.length > 100) return 'Email maksimal 100 karakter';
      if (!REGEX_PATTERNS.email.test(val.toLowerCase())) {
        return 'Format email tidak valid (contoh: user@domain.com)';
      }
      return null;

    case 'no_hp':
      if (!val) return 'Nomor HP wajib diisi';
      if (!REGEX_PATTERNS.no_hp.test(val)) {
        return 'Nomor HP harus diawali 08 dan memiliki panjang 10-13 digit angka';
      }
      return null;

    case 'program_studi':
      if (!val) return 'Program studi wajib dipilih';
      if (!PROGRAM_STUDI_LIST.includes(val)) {
        return 'Program studi tidak valid atau tidak terdaftar';
      }
      return null;

    default:
      return null;
  }
}

/**
 * Validasi seluruh form sebelum submit.
 * Mengembalikan { isValid, errors, normalizedData }
 */
export function validateAll(formData) {
  const errors = {};
  const normalizedData = {
    nama_lengkap: (formData.nama_lengkap || '').trim(),
    nim: normalizeField('nim', formData.nim || ''),
    email: normalizeField('email', formData.email || ''),
    no_hp: normalizeField('no_hp', formData.no_hp || ''),
    program_studi: normalizeField('program_studi', formData.program_studi || ''),
  };

  const fields = ['nama_lengkap', 'nim', 'email', 'no_hp', 'program_studi'];
  for (const field of fields) {
    const errorMsg = validateField(field, normalizedData[field]);
    if (errorMsg) {
      errors[field] = errorMsg;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    normalizedData,
  };
}
