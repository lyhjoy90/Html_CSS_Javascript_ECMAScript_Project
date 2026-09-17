import React from "react";
import MessageBox from "./MessageBox";

// 개별 입력칸 공통 컴포넌트
function Field({ name, label, type = "text", required = false, value, onChange, className = "" }) {
  return (
    <div className={`form-group ${className}`.trim()}>
      <label htmlFor={name}>
        {label} {required && " *"}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows="3"
          value={value || ""}
          onChange={onChange}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          required={required}
          value={value || ""}
          onChange={onChange}
        />
      )}
    </div>
  );
}

// App.jsx에서 기존 BookForm 대신 불러와서 사용할 리팩토링 컴포넌트
export default function BookFormField({
  form,
  isEditing,
  message,
  onChange,
  onSubmit,
  onCancel,
  containerRef,
}) {
  return (
    <div className="form-container" ref={containerRef}>
      <h2>{isEditing ? "도서 정보 수정" : "새 도서 등록"}</h2>
      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <Field name="title" label="제목" required value={form.title} onChange={onChange} />
          <Field name="author" label="저자" required value={form.author} onChange={onChange} />
          <Field name="isbn" label="ISBN" required value={form.isbn} onChange={onChange} />
          <Field name="price" label="가격" type="number" value={form.price} onChange={onChange} />
          <Field name="pageCount" label="페이지 수" type="number" value={form.pageCount} onChange={onChange} />
          <Field name="publishDate" label="출판일" type="date" value={form.publishDate} onChange={onChange} />
          <Field name="language" label="언어" value={form.language} onChange={onChange} />
          <Field name="publisher" label="출판사" value={form.publisher} onChange={onChange} />
          <Field name="edition" label="에디션" value={form.edition} onChange={onChange} />
          <Field name="coverImageUrl" label="표지 이미지 URL" type="url" value={form.coverImageUrl} onChange={onChange} />
        </div>

        <Field
          name="description"
          label="설명"
          type="textarea"
          value={form.description}
          onChange={onChange}
          className="full-width"
        />

        <MessageBox message={message} />

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {isEditing ? "수정 완료" : "도서 등록"}
          </button>
          {isEditing && (
            <button type="button" className="cancel-btn" onClick={onCancel}>
              취소
            </button>
          )}
        </div>
      </form>
    </div>
  );
}