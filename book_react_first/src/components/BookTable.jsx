// 컴포넌트 바깥에 두는 가격 다듬기 함수
const formatPrice = (price) => {
  if (price === null || price === undefined || price === "") return "-";
  return `₩${Number(price).toLocaleString()}`;
};

export default function BookTable({
  books,
  loading,
  error,
  onEdit,
  onDelete,
  onDetail,
}) {
  if (loading) {
    return <p className="loading-msg">도서 목록을 불러오는 중...</p>;
  }

  if (error) {
    return <p className="error-msg">{error}</p>;
  }

  if (!books || books.length === 0) {
    return <p className="empty-msg">등록된 도서가 없습니다.</p>;
  }

  return (
    <table className="book-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>제목</th>
          <th>저자</th>
          <th>출판사</th>
          <th>카테고리</th>
          <th>가격</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publisher ?? "-"}</td>
            <td>{book.category}</td>
            <td>{formatPrice(book.price)}</td>
            <td>
              <button
                type="button"
                className="edit-btn"
                onClick={() => onEdit(book.id)}
              >
                수정
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => onDelete(book.id)}
              >
                삭제
              </button>
              <button
                type="button"
                className="detail-btn"
                onClick={() => onDetail(book.id)}
              >
                상세
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}