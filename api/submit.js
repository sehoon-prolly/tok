// Vercel 서버리스 함수 - Google Apps Script 프록시
// 브라우저에서 직접 Apps Script를 호출하면 CORS 리다이렉트 문제가 생기므로
// 서버에서 대신 전달합니다.
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const webhookUrl = process.env.VITE_SHEETS_WEBHOOK;
  if (!webhookUrl) {
    return res.status(500).json({ error: 'VITE_SHEETS_WEBHOOK 환경변수가 없습니다.' });
  }

  try {
    // JSON → URLSearchParams 변환 후 Apps Script로 전달
    const params = new URLSearchParams(req.body);

    await fetch(webhookUrl, {
      method: 'POST',
      body: params,
      redirect: 'follow',
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[TUK submit]', err);
    return res.status(500).json({ error: err.message });
  }
}
