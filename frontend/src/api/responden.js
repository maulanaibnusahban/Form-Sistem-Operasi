/**
 * API client untuk modul responden dan health check
 * Menggunakan path relatif '/api/...' melalui proxy Vite di dev dan express static di prod.
 */

export async function submitResponden(payload) {
  const response = await fetch('/api/responden', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({
    success: false,
    message: 'Gagal memproses respon dari server.',
  }));

  return {
    status: response.status,
    ok: response.ok,
    data,
  };
}

export async function checkHealth() {
  const response = await fetch('/api/health');
  const data = await response.json().catch(() => ({
    status: 'error',
    database: 'disconnected',
  }));

  return {
    status: response.status,
    ok: response.ok,
    data,
  };
}
