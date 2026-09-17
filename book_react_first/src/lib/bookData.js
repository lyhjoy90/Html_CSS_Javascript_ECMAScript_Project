// 입력칸 11개의 초기 상태 (undefined가 포함되면 제어 컴포넌트 경고 발생)
export const EMPTY_FORM = {
  isbn: "",
  title: "",
  author: "",
  price: "",
  pageCount: "",
  publishDate: "",
  language: "",
  publisher: "",
  edition: "",
  coverImageUrl: "",
  description: "",
};

// 숫자 변환 헬퍼 함수
export const toNumberOrNull = (value) => {
  if (value === "" || value === null || value === undefined) return null;
  const num = Number(value);
  return isNaN(num) ? null : num;
};

// State 폼 데이터 -> 서버 요청 객체 변환 (빈 문자열은 null로 처리)
export const toRequest = (form) => {
  return {
    isbn: form.isbn || null,
    title: form.title || null,
    author: form.author || null,
    price: toNumberOrNull(form.price),
    pageCount: toNumberOrNull(form.pageCount),
    publishDate: form.publishDate || null,
    language: form.language || null,
    publisher: form.publisher || null,
    edition: form.edition || null,
    coverImageUrl: form.coverImageUrl || null,
    description: form.description || null,
  };
};

// 서버 응답 객체 -> State 폼 데이터 변환 (null/undefined는 빈 문자열 ""로 처리)
export const toFormValues = (book) => {
  if (!book) return EMPTY_FORM;
  return {
    isbn: book.isbn ?? "",
    title: book.title ?? "",
    author: book.author ?? "",
    price: book.price ?? "",
    pageCount: book.pageCount ?? "",
    publishDate: book.publishDate ?? "",
    language: book.language ?? "",
    publisher: book.publisher ?? "",
    edition: book.edition ?? "",
    coverImageUrl: book.coverImageUrl ?? "",
    description: book.description ?? "",
  };
};

// [과제 8] 도서 유효성 검사 함수 (추가됨)
export const validateBook = (bookData) => {
  if (!bookData.title || !bookData.title.trim()) {
    return "제목을 입력하세요.";
  }
  if (!bookData.author || !bookData.author.trim()) {
    return "저자를 입력하세요.";
  }
  if (!bookData.isbn || !bookData.isbn.trim()) {
    return "ISBN을 입력하세요.";
  }
  if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(bookData.isbn)) {
    return "ISBN에 한글은 입력할 수 없습니다.";
  }
  return null;
};