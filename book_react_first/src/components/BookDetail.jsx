import React from "react";

export default function BookDetail({ book, onClose }) {
  // book이 없으면 아무것도 그리지 않음 (조건부 렌더링)
  if (!book) return null;

  // 값이 없거나 빈 문자열일 때 '-'로 표시해주는 헬퍼 함수
  const val = (value) => (value !== undefined && value !== null && value !== "" ? value : "-");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>도서 상세 정보</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          {/* 표지 이미지가 있는 경우 표시 */}
          {book.coverImageUrl && (
            <div className="detail-cover">
              <img src={book.coverImageUrl} alt={book.title} />
            </div>
          )}

          <div className="detail-grid">
            <div className="detail-item">
              <strong>제목:</strong> {val(book.title)}
            </div>
            <div className="detail-item">
              <strong>저자:</strong> {val(book.author)}
            </div>
            <div className="detail-item">
              <strong>ISBN:</strong> {val(book.isbn)}
            </div>
            <div className="detail-item">
              <strong>가격:</strong> {book.price ? `${Number(book.price).toLocaleString()}원` : "-"}
            </div>
            <div className="detail-item">
              <strong>페이지 수:</strong> {book.pageCount ? `${book.pageCount}쪽` : "-"}
            </div>
            <div className="detail-item">
              <strong>출판일:</strong> {val(book.publishDate)}
            </div>
            <div className="detail-item">
              <strong>언어:</strong> {val(book.language)}
            </div>
            <div className="detail-item">
              <strong>출판사:</strong> {val(book.publisher)}
            </div>
            <div className="detail-item">
              <strong>에디션:</strong> {val(book.edition)}
            </div>
          </div>

          <div className="detail-description">
            <strong>설명:</strong>
            <p>{val(book.description)}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="cancel-btn" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}