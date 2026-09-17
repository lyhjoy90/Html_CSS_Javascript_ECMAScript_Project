import { useState, useEffect, useRef } from "react";
import { APP_MODE } from "./config"; // 👈 [과제 11] 추가
import { fetchBooks, fetchBook, createBook, updateBook, deleteBook } from "./api/bookApi";
import { EMPTY_FORM, toRequest, validateBook, toFormValues } from "./lib/bookData";
import BookTable from "./components/BookTable";
import BookForm from "./components/BookFormField"; // 👈 [과제 13] BookFormField로 변경
import BookDetail from "./components/BookDetail";
import "./style.css";

function App() {
  // [과제 3] 7개 상태
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState(null);
  const [message, setMessage] = useState(null);
  const [detailBook, setDetailBook] = useState(null);

  // [과제 9] 폼 영역 이동을 위한 useRef
  const formRef = useRef(null);

  // [과제 4] 목록 불러오기
  const loadBooks = async () => {
    setLoading(true);
    setListError(null);
    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (err) {
      console.error(err);
      setListError("도서 목록을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // [과제 4] 처음 한 번 목록 로드
  useEffect(() => {
    loadBooks();
  }, []);

  // [과제 7] 성공 메시지만 3초 후 자동 삭제
  useEffect(() => {
    if (message && message.type === "success") {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // [과제 8] 폼과 수정 상태를 함께 초기화
  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  // [과제 6] 단일 입력 변경 핸들러
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // [과제 8] 취소 버튼 핸들러
  const handleFormCancel = () => {
    resetForm();
  };

  // [과제 8] 폼 제출 핸들러 (도서 등록 및 수정)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const requestData = toRequest(form);
    const validationError = validateBook(requestData);

    if (validationError) {
      setMessage({ text: validationError, type: "error" });
      return;
    }

    try {
      if (editingId) {
        await updateBook(editingId, requestData);
        setMessage({ text: "도서 정보가 수정되었습니다.", type: "success" });
      } else {
        await createBook(requestData);
        setMessage({ text: "새 도서가 등록되었습니다.", type: "success" });
      }

      resetForm();
      await loadBooks();
    } catch (err) {
      console.error(err);
      setMessage({
        text: err.message || "처리 중 오류가 발생했습니다.",
        type: "error",
      });
    }
  };

  // [과제 9] 수정 준비 핸들러
  const handleEdit = async (bookId) => {
    setMessage(null);
    try {
      const book = await fetchBook(bookId);
      setForm(toFormValues(book));
      setEditingId(bookId);

      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.error(err);
      setMessage({
        text: "도서 정보를 불러오는 데 실패했습니다.",
        type: "error",
      });
    }
  };

  // [과제 9] 삭제 핸들러
  const handleDelete = async (bookId) => {
    if (!window.confirm("정말 이 도서를 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteBook(bookId);
      setMessage({ text: "도서가 삭제되었습니다.", type: "success" });

      if (editingId === bookId) {
        resetForm();
      }

      await loadBooks();
    } catch (err) {
      console.error(err);
      setMessage({
        text: "도서 삭제 중 오류가 발생했습니다.",
        type: "error",
      });
    }
  };

  // [과제 10] 상세 정보 조회 핸들러
  const handleDetail = async (bookId) => {
    try {
      const book = await fetchBook(bookId);
      setDetailBook(book);
    } catch (err) {
      console.error(err);
      setMessage({
        text: "상세 정보를 불러오는 데 실패했습니다.",
        type: "error",
      });
    }
  };

  // 👈 [과제 11] 배지 class 생성
  const modeClass = APP_MODE ? APP_MODE.toLowerCase() : "test";
  const badgeClass = `app-mode ${modeClass}`;

  return (
    <div className="container">
      {/* 👈 [과제 11] 제목 옆 배지(span) 반영 */}
      <h1>
        도서 관리 시스템 <span className={badgeClass}>{APP_MODE}</span>
      </h1>

      <BookForm
        form={form}
        isEditing={editingId !== null}
        message={message}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
        containerRef={formRef}
      />

      <BookTable
        books={books}
        loading={loading}
        error={listError}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetail={handleDetail}
      />

      <BookDetail book={detailBook} onClose={() => setDetailBook(null)} />
    </div>
  );
}

export default App;