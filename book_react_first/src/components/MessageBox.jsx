export default function MessageBox({ message }) {
  // message가 없거나 message.text가 없으면 아무것도 렌더링하지 않음 (null 반환)
  if (!message || !message.text) {
    return null;
  }

  return (
    <div className={`message-box ${message.type ?? ""}`}>
      {message.text}
    </div>
  );
}