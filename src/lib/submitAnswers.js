// 구글 앱스스크립트 웹훅으로 응답 데이터를 전송합니다.
// VITE_SHEETS_WEBHOOK 환경변수가 없으면 아무것도 하지 않습니다.
export async function submitAnswers(answers) {
  const webhookUrl = import.meta.env.VITE_SHEETS_WEBHOOK;
  if (!webhookUrl) {
    console.warn('[TUK] VITE_SHEETS_WEBHOOK 환경변수가 설정되지 않았습니다.');
    return { ok: false, reason: 'no_webhook' };
  }

  // 주요 필드를 개별 컬럼으로 분리
  const payload = new URLSearchParams({
    timestamp:       new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    university:      String(answers[29] ?? ''),
    gender:          String(answers[25] ?? ''),
    preferred_gender: String(answers[26] ?? ''),
    email:           String(answers[30] ?? ''),
    age_up:          String(answers[27] ?? ''),
    age_down:        String(answers[28] ?? ''),
    // 1~24번 가치관 답변은 JSON으로 묶어서 저장
    value_answers:   JSON.stringify(
      Object.fromEntries(
        Array.from({ length: 24 }, (_, i) => [
          `Q${i + 1}`,
          answers[i + 1] ?? null,
        ])
      )
    ),
  });

  try {
    // no-cors: 응답을 읽을 수 없지만 시트에는 기록됩니다.
    await fetch(webhookUrl, {
      method: 'POST',
      body:   payload,
      mode:   'no-cors',
    });
    return { ok: true };
  } catch (err) {
    console.error('[TUK] 제출 실패:', err);
    return { ok: false, reason: err.message };
  }
}
