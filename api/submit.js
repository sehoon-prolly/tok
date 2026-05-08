export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET 요청: 환경변수 세팅 확인용
  if (req.method === 'GET') {
    const webhookUrl = process.env.VITE_SHEETS_WEBHOOK;
    return res.status(200).json({
      webhookConfigured: !!webhookUrl,
      // URL 앞 30자만 노출 (보안상 전체 노출 안 함)
      webhookPreview: webhookUrl ? webhookUrl.slice(0, 40) + '...' : null,
    });
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const webhookUrl = process.env.VITE_SHEETS_WEBHOOK;
  if (!webhookUrl) {
    return res.status(500).json({ error: 'VITE_SHEETS_WEBHOOK 환경변수가 없습니다.' });
  }

  try {
    const params = new URLSearchParams(req.body);

    const gsRes = await fetch(webhookUrl, {
      method: 'POST',
      body: params,
      redirect: 'follow',
    });

    return res.status(200).json({ ok: true, gsStatus: gsRes.status });
  } catch (err) {
    console.error('[TUK submit]', err);
    return res.status(500).json({ error: err.message });
  }
}
