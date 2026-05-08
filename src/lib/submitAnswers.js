export async function submitAnswers(answers) {
  const payload = {
    timestamp:        new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    university:       String(answers[29] ?? ''),
    gender:           String(answers[25] ?? ''),
    preferred_gender: String(answers[26] ?? ''),
    email:            String(answers[30] ?? ''),
    age_up:           String(answers[27] ?? ''),
    age_down:         String(answers[28] ?? ''),
    value_answers:    JSON.stringify(
      Object.fromEntries(
        Array.from({ length: 24 }, (_, i) => [`Q${i + 1}`, answers[i + 1] ?? null])
      )
    ),
  };

  try {
    // 브라우저 → /api/submit (같은 도메인) → Google Apps Script (서버→서버)
    const res = await fetch('/api/submit', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    return { ok: res.ok };
  } catch (err) {
    console.error('[TUK] 제출 실패:', err);
    return { ok: false, reason: err.message };
  }
}
