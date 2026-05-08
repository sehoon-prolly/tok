/**
 * TUK(툭) - Google Apps Script 웹훅
 *
 * 사용 방법:
 * 1. https://sheets.google.com 에서 새 스프레드시트 생성
 * 2. 시트 첫 행(헤더)에 아래 내용 입력:
 *    A1: 제출시각  B1: 대학교  C1: 성별  D1: 희망상대성별
 *    E1: 이메일   F1: 나이위  G1: 나이아래  H1: 가치관답변(JSON)
 * 3. 상단 메뉴 → 확장 프로그램 → Apps Script 클릭
 * 4. 이 파일의 내용 전체를 붙여넣기 (기존 내용 덮어쓰기)
 * 5. 저장 후 → 배포 → 새 배포
 *    - 유형: 웹 앱
 *    - 실행 주체: 나(내 계정)
 *    - 액세스 권한: 모든 사용자
 * 6. 배포 후 나타나는 '웹 앱 URL'을 복사
 * 7. Vercel 환경변수 VITE_SHEETS_WEBHOOK 에 붙여넣기
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var p     = e.parameter;

    sheet.appendRow([
      p.timestamp       || '',
      p.university      || '',
      p.gender          || '',
      p.preferred_gender || '',
      p.email           || '',
      p.age_up          || '',
      p.age_down        || '',
      p.value_answers   || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 배포 확인용 (브라우저에서 URL 열면 OK 응답)
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'TUK webhook' }))
    .setMimeType(ContentService.MimeType.JSON);
}
