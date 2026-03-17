"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CONTACT_METHOD_OPTIONS,
  DAY_OPTIONS,
  LESSON_GOAL_OPTIONS,
  LESSON_PLAN_OPTIONS,
  LEVEL_OPTIONS,
  PRACTICE_PURPOSE_OPTIONS,
  PRACTICE_TIME_BAND_OPTIONS,
  REGULAR_LESSON_PLAN_OPTIONS,
  START_TIMING_OPTIONS,
  SUBSCRIPTION_PLAN_OPTIONS,
  TIME_OPTIONS,
  USAGE_FREQUENCY_OPTIONS,
  createInitialInquiryValues,
  formatPhoneInput,
  getInquiryTypeLabel,
  type InquiryFormErrors,
  type InquiryFormValues,
  type InquiryType,
  INQUIRY_TYPE_OPTIONS,
  validateInquiryForm,
} from "@/lib/inquiry";

type InquiryModalProps = {
  open: boolean;
  onClose: () => void;
};

type SubmitState = "idle" | "submitting" | "success";

const FOCUSABLE_SELECTORS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function InquiryModal({ open, onClose }: InquiryModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState("");
  const [values, setValues] = useState<InquiryFormValues>(createInitialInquiryValues());
  const [errors, setErrors] = useState<InquiryFormErrors>({});
  const [successPayload, setSuccessPayload] = useState<{
    inquiryType: string;
    name: string;
    phone: string;
  } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const selectedTypeMeta = useMemo(
    () => INQUIRY_TYPE_OPTIONS.find((option) => option.value === values.inquiryType),
    [values.inquiryType],
  );

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const target = modalRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);
    target?.focus();
  }, [open, step, submitState]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      if (!modalRef.current) return;

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
      ).filter((el) => !el.hasAttribute("disabled"));

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) return;
    setStep(1);
    setSubmitState("idle");
    setSubmitError("");
    setSuccessPayload(null);
    setValues(createInitialInquiryValues());
    setErrors({});
  }, [open]);

  const clearError = (field: keyof InquiryFormValues) => {
    if (!errors[field]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const setValue = (field: keyof InquiryFormValues, value: string | string[]) => {
    setValues((prev) => ({ ...prev, [field]: value as never }));
    clearError(field);
  };

  const toggleDay = (day: string) => {
    setValues((prev) => {
      const exists = prev.preferredDays.includes(day);
      const preferredDays = exists
        ? prev.preferredDays.filter((item) => item !== day)
        : [...prev.preferredDays, day];
      return { ...prev, preferredDays };
    });
    clearError("preferredDays");
  };

  const handleSelectType = (type: InquiryType) => {
    setValue("inquiryType", type);
  };

  const handleNextStep = () => {
    if (!values.inquiryType) {
      setErrors((prev) => ({ ...prev, inquiryType: "문의 유형을 먼저 선택해 주세요." }));
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError("");

    const result = validateInquiryForm(values);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    try {
      setSubmitState("submitting");
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = await response.json();
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.message || "문의 저장 중 오류가 발생했습니다.");
      }
      setSubmitState("success");
      setSuccessPayload({
        inquiryType: getInquiryTypeLabel(values.inquiryType),
        name: values.name,
        phone: values.phone,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "문의 접수 중 오류가 발생했습니다.";
      setSubmitError(message);
      setSubmitState("idle");
    }
  };

  const handleReset = () => {
    setStep(1);
    setSubmitState("idle");
    setSubmitError("");
    setSuccessPayload(null);
    setValues(createInitialInquiryValues());
    setErrors({});
  };

  if (!open) return null;

  return (
    <div
      className="inquiry-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="문의하기 모달"
      onClick={onClose}
    >
      <div className="inquiry-modal" ref={modalRef} onClick={(event) => event.stopPropagation()}>
        <button type="button" className="inquiry-close" onClick={onClose} aria-label="닫기">
          <span className="material-symbols-outlined">close</span>
        </button>

        {submitState === "success" && successPayload ? (
          <div className="inquiry-success">
            <h3>문의가 접수되었습니다</h3>
            <p>입력하신 연락처로 순차적으로 안내드릴게요.</p>
            <dl>
              <div>
                <dt>문의 유형</dt>
                <dd>{successPayload.inquiryType}</dd>
              </div>
              <div>
                <dt>이름</dt>
                <dd>{successPayload.name}</dd>
              </div>
              <div>
                <dt>연락처</dt>
                <dd>{successPayload.phone}</dd>
              </div>
            </dl>
            <div className="inquiry-action-row">
              <button type="button" className="pill-button secondary-inquiry" onClick={onClose}>
                닫기
              </button>
              <button type="button" className="pill-button accent" onClick={handleReset}>
                다시 문의하기
              </button>
            </div>
          </div>
        ) : (
          <>
            <header className="inquiry-head">
              <h3>{step === 1 ? "문의 유형 선택" : "상세 정보 입력"}</h3>
            </header>

            {step === 1 ? (
              <div className="inquiry-step1">
                <div className="inquiry-type-grid">
                  {INQUIRY_TYPE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={values.inquiryType === option.value ? "inquiry-type-card active" : "inquiry-type-card"}
                      onClick={() => handleSelectType(option.value)}
                    >
                      <strong>{option.label}</strong>
                      <span>{option.description}</span>
                    </button>
                  ))}
                </div>
                {errors.inquiryType ? <p className="inquiry-error">{errors.inquiryType}</p> : null}
                <div className="inquiry-action-row">
                  <button type="button" className="pill-button accent" onClick={handleNextStep}>
                    다음
                  </button>
                </div>
              </div>
            ) : (
              <form className="inquiry-form" onSubmit={handleSubmit}>
                {selectedTypeMeta ? (
                  <div className="inquiry-selected-type">
                    <strong>{selectedTypeMeta.label}</strong>
                    <span>{selectedTypeMeta.description}</span>
                  </div>
                ) : null}

                <div className="inquiry-form-grid">
                  <label>
                    이름*
                    <input
                      value={values.name}
                      onChange={(event) => setValue("name", event.target.value)}
                      placeholder="이름을 입력해 주세요"
                    />
                    {errors.name ? <small className="inquiry-error">{errors.name}</small> : null}
                  </label>

                  <label>
                    연락처*
                    <input
                      value={values.phone}
                      onChange={(event) => setValue("phone", formatPhoneInput(event.target.value))}
                      placeholder="010-0000-0000"
                    />
                    {errors.phone ? <small className="inquiry-error">{errors.phone}</small> : null}
                  </label>

                  <label>
                    희망 연락 시간대
                    <input
                      value={values.preferredContactTime}
                      onChange={(event) => setValue("preferredContactTime", event.target.value)}
                      placeholder="예: 평일 19시 이후"
                    />
                  </label>
                </div>

                <fieldset>
                  <legend>희망 연락 방식*</legend>
                  <div className="chip-row">
                    {CONTACT_METHOD_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={values.preferredContactMethod === option.value ? "chip active" : "chip"}
                        onClick={() => setValue("preferredContactMethod", option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  {errors.preferredContactMethod ? (
                    <small className="inquiry-error">{errors.preferredContactMethod}</small>
                  ) : null}
                </fieldset>

                {(values.inquiryType === "lesson_inquiry" ||
                  values.inquiryType === "trial_lesson" ||
                  values.inquiryType === "regular_lesson") && (
                  <>
                    <fieldset>
                      <legend>현재 수준*</legend>
                      <div className="chip-row">
                        {LEVEL_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={values.level === option ? "chip active" : "chip"}
                            onClick={() => setValue("level", option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {errors.level ? <small className="inquiry-error">{errors.level}</small> : null}
                    </fieldset>

                    <fieldset>
                      <legend>{values.inquiryType === "trial_lesson" ? "체험 목적*" : "수강 목적*"}</legend>
                      <div className="chip-row">
                        {LESSON_GOAL_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={values.lessonGoal === option ? "chip active" : "chip"}
                            onClick={() => setValue("lessonGoal", option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {errors.lessonGoal ? <small className="inquiry-error">{errors.lessonGoal}</small> : null}
                    </fieldset>

                    <fieldset>
                      <legend>희망 요일(복수 선택)*</legend>
                      <div className="chip-row">
                        {DAY_OPTIONS.map((day) => (
                          <button
                            key={day}
                            type="button"
                            className={values.preferredDays.includes(day) ? "chip active" : "chip"}
                            onClick={() => toggleDay(day)}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                      {errors.preferredDays ? (
                        <small className="inquiry-error">{errors.preferredDays}</small>
                      ) : null}
                    </fieldset>

                    <fieldset>
                      <legend>희망 시간대*</legend>
                      <div className="chip-row">
                        {TIME_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={values.preferredTime === option ? "chip active" : "chip"}
                            onClick={() => setValue("preferredTime", option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {errors.preferredTime ? (
                        <small className="inquiry-error">{errors.preferredTime}</small>
                      ) : null}
                    </fieldset>
                  </>
                )}

                {(values.inquiryType === "lesson_inquiry" || values.inquiryType === "regular_lesson") && (
                  <>
                    <fieldset>
                      <legend>희망 시작 시기*</legend>
                      <div className="chip-row">
                        {START_TIMING_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={values.startTiming === option ? "chip active" : "chip"}
                            onClick={() => setValue("startTiming", option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {errors.startTiming ? (
                        <small className="inquiry-error">{errors.startTiming}</small>
                      ) : null}
                    </fieldset>

                    <fieldset>
                      <legend>{values.inquiryType === "regular_lesson" ? "신청 상품*" : "관심 상품*"}</legend>
                      <div className="chip-row">
                        {(values.inquiryType === "regular_lesson"
                          ? REGULAR_LESSON_PLAN_OPTIONS
                          : LESSON_PLAN_OPTIONS
                        ).map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={values.interestedPlan === option ? "chip active" : "chip"}
                            onClick={() => setValue("interestedPlan", option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {errors.interestedPlan ? (
                        <small className="inquiry-error">{errors.interestedPlan}</small>
                      ) : null}
                    </fieldset>
                  </>
                )}

                {values.inquiryType === "practice_subscription" && (
                  <>
                    <fieldset>
                      <legend>이용 목적*</legend>
                      <div className="chip-row">
                        {PRACTICE_PURPOSE_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={values.practicePurpose === option ? "chip active" : "chip"}
                            onClick={() => setValue("practicePurpose", option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {errors.practicePurpose ? (
                        <small className="inquiry-error">{errors.practicePurpose}</small>
                      ) : null}
                    </fieldset>
                    <fieldset>
                      <legend>희망 이용 시간대*</legend>
                      <div className="chip-row">
                        {PRACTICE_TIME_BAND_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={values.preferredTime === option ? "chip active" : "chip"}
                            onClick={() => setValue("preferredTime", option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {errors.preferredTime ? (
                        <small className="inquiry-error">{errors.preferredTime}</small>
                      ) : null}
                    </fieldset>
                    <fieldset>
                      <legend>이용 빈도*</legend>
                      <div className="chip-row">
                        {USAGE_FREQUENCY_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={values.usageFrequency === option ? "chip active" : "chip"}
                            onClick={() => setValue("usageFrequency", option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {errors.usageFrequency ? (
                        <small className="inquiry-error">{errors.usageFrequency}</small>
                      ) : null}
                    </fieldset>
                    <fieldset>
                      <legend>관심 상품*</legend>
                      <div className="chip-row">
                        {SUBSCRIPTION_PLAN_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={values.interestedPlan === option ? "chip active" : "chip"}
                            onClick={() => setValue("interestedPlan", option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {errors.interestedPlan ? (
                        <small className="inquiry-error">{errors.interestedPlan}</small>
                      ) : null}
                    </fieldset>
                  </>
                )}

                {values.inquiryType === "practice_room" && (
                  <div className="inquiry-form-grid">
                    <label>
                      이용 희망 날짜*
                      <input
                        type="date"
                        value={values.visitDate}
                        onChange={(event) => setValue("visitDate", event.target.value)}
                      />
                      {errors.visitDate ? <small className="inquiry-error">{errors.visitDate}</small> : null}
                    </label>
                    <label>
                      이용 희망 시간대*
                      <select value={values.preferredTime} onChange={(event) => setValue("preferredTime", event.target.value)}>
                        <option value="">선택해 주세요</option>
                        {TIME_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.preferredTime ? (
                        <small className="inquiry-error">{errors.preferredTime}</small>
                      ) : null}
                    </label>
                    <label>
                      이용 목적*
                      <select
                        value={values.practicePurpose}
                        onChange={(event) => setValue("practicePurpose", event.target.value)}
                      >
                        <option value="">선택해 주세요</option>
                        {PRACTICE_PURPOSE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.practicePurpose ? (
                        <small className="inquiry-error">{errors.practicePurpose}</small>
                      ) : null}
                    </label>
                    <label>
                      예상 이용 인원*
                      <input
                        type="number"
                        min={1}
                        value={values.participants}
                        onChange={(event) => setValue("participants", event.target.value)}
                        placeholder="예: 2"
                      />
                      {errors.participants ? (
                        <small className="inquiry-error">{errors.participants}</small>
                      ) : null}
                    </label>
                  </div>
                )}

                {values.inquiryType === "other" && (
                  <label>
                    문의 제목*
                    <input
                      value={values.subject}
                      onChange={(event) => setValue("subject", event.target.value)}
                      placeholder="문의 제목을 입력해 주세요"
                    />
                    {errors.subject ? <small className="inquiry-error">{errors.subject}</small> : null}
                  </label>
                )}

                <label>
                  문의 내용*
                  <textarea
                    rows={5}
                    value={values.message}
                    onChange={(event) => setValue("message", event.target.value)}
                    placeholder="문의 내용을 입력해 주세요"
                  />
                  {errors.message ? <small className="inquiry-error">{errors.message}</small> : null}
                </label>

                {submitError ? <p className="inquiry-submit-error">{submitError}</p> : null}

                <div className="inquiry-action-row">
                  <button
                    type="button"
                    className="pill-button secondary-inquiry"
                    onClick={() => setStep(1)}
                    disabled={submitState === "submitting"}
                  >
                    이전
                  </button>
                  <button type="submit" className="pill-button accent" disabled={submitState === "submitting"}>
                    {submitState === "submitting" ? "접수 중..." : "문의 접수하기"}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
