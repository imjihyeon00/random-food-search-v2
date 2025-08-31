import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { BUTTON_SIZES_TYPE } from "../constants/styled";

const MAX_LEN = 2000;
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;
const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function ContactFromModalChild({ onClose }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  // reCAPTCHA 스크립트 1회 로드
  const recaptchaLoaded = useRef(false);
  useEffect(() => {
    if (recaptchaLoaded.current) return;
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    s.async = true;
    s.defer = true;
    s.onload = () => (recaptchaLoaded.current = true);
    document.head.appendChild(s);
  }, []);

  const isValidEmail = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    [email]
  );
  const contentPlain = useMemo(() => stripHtml(content), [content]);
  const overLimit = contentPlain.length > MAX_LEN;
  const canSubmit = isValidEmail && contentPlain.trim().length > 0 && !overLimit && !loading;

  // 30초 rate limit
  const blocked = useMemo(() => {
    try {
      const last = Number(localStorage.getItem("contact_last_ts") || 0);
      return Date.now() - last < 30_000;
    } catch { return false; }
  }, [loading]); // 전송 후 갱신 반영

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!canSubmit) return;
    if (blocked) {
      setError("요청이 너무 빠릅니다. 30초 후 다시 시도해주세요.");
      return;
    }
    if (!window.grecaptcha) {
      setError("보안 검증 스크립트를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    setLoading(true);
    try {
      // reCAPTCHA v3 토큰 발급
      const token = await window.grecaptcha.execute(SITE_KEY, { action: "contact" });

      // reCAPTCHA 토큰 발급 후…
      const form = new URLSearchParams();
      form.append("email", email);
      form.append("name", name.trim());
      form.append("content", contentPlain.slice(0, MAX_LEN));
      form.append("ua", navigator.userAgent);
      form.append("ts", String(Date.now()));
      form.append("recaptchaToken", token);

      const res = await fetch(ENDPOINT, { method: "POST", body: form });

      if (!res.ok) throw new Error("failed");
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "failed");

      try { localStorage.setItem("contact_last_ts", String(Date.now())); }
      catch {
        console.error("Failed to set contact_last_ts");
      }
      setDone(true);
    } catch (err) {
      console.error("error:", err);
      setError("전송 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <Wrap>
        <Result>문의가 전송되었습니다. 빠르게 확인할게요! 🙌</Result>
        <Actions>
          <Button
            text="닫기"
            onClick={onClose}
          />
        </Actions>
      </Wrap>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Wrap>
        <Field>
          <Label>작성자 이메일 <Req>*</Req></Label>
          <Input type="email" placeholder="you@example.com"
                 value={email} onChange={(e) => setEmail(e.target.value)} required />
          {!isValidEmail && email && <Hint>올바른 이메일 형식이 아니에요.</Hint>}
        </Field>

        <Field>
          <Label>작성자 이름 (선택)</Label>
          <Input type="text" placeholder="홍길동"
                 value={name} onChange={(e) => setName(e.target.value)} />
        </Field>

        <Field>
          <Label>내용 <Req>*</Req></Label>
          <Textarea rows={6} placeholder="문의 내용을 자세히 적어주세요."
                    value={content} onChange={(e) => setContent(e.target.value)} required />
          <Small>{contentPlain.length}/{MAX_LEN}자</Small>
          {overLimit && <ErrorMsg>본문은 최대 {MAX_LEN}자까지 가능합니다.</ErrorMsg>}
        </Field>

        {blocked && <ErrorMsg>요청이 너무 빠릅니다. 30초 후 다시 시도해주세요.</ErrorMsg>}
        {error && <ErrorMsg>{error}</ErrorMsg>}

        <Actions>
          <Button
            text="취소"
            size={BUTTON_SIZES_TYPE.sm}
          />
          <Button
            text={loading ? "전송 중..." : "작성 완료"}
            type="submit"
            disabled={!canSubmit}
            size={BUTTON_SIZES_TYPE.sm}
            active={true}
          />
        </Actions>
      </Wrap>
    </form>
  );
}

/* utils */
function stripHtml(html = "") {
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || div.innerText || "").replace(/\u00A0/g, " "); // &nbsp; -> space
}

/* styled */
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const Label = styled.label`
  font-weight: 700;
`;
const Req = styled.span`
  color: #ef4444;
  margin-left: 4px;
`;
const Input = styled.input`
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 12px;
  outline: none;
  &:focus {
    border-color: #ffa853;
    box-shadow: 0 0 0 3px rgba(255, 168, 83, .25);
  }
`;
const Textarea = styled.textarea`
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 12px;
  outline: none;
  resize: vertical;
  &:focus {
    border-color: #ffa853;
    box-shadow: 0 0 0 3px rgba(255, 168, 83, .25);
  }
`;
const Small = styled.div`
  color: #6b7280;
  font-size: 12px;
  text-align: right;
`;
const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 4px;
`;
const Result = styled.div`
  padding: 8px 0;
  color: #111;
`;
const ErrorMsg = styled.div`
  color: #ef4444;
  font-size: 14px;
`;
const Hint = styled.div`
  color: #9ca3af;
  font-size: 12px;
`;
