export type InquiryType =
  | "lesson_inquiry"
  | "trial_lesson"
  | "regular_lesson"
  | "practice_subscription"
  | "practice_room"
  | "other";

export type ContactMethod = "phone" | "sms" | "kakao";

export type InquiryStatus = "new" | "contacted" | "consulting" | "converted" | "on_hold";

export type InquiryFormValues = {
  inquiryType: InquiryType | "";
  name: string;
  phone: string;
  preferredContactMethod: ContactMethod | "";
  preferredContactTime: string;
  message: string;
  level: string;
  lessonGoal: string;
  preferredDays: string[];
  preferredTime: string;
  startTiming: string;
  interestedPlan: string;
  practicePurpose: string;
  usageFrequency: string;
  visitDate: string;
  participants: string;
  subject: string;
};

export type InquiryFormErrors = Partial<Record<keyof InquiryFormValues, string>>;

export const INQUIRY_TYPE_OPTIONS: Array<{ value: InquiryType; label: string; description: string }> = [
  { value: "lesson_inquiry", label: "드럼 레슨 문의", description: "수업 방식과 레벨에 대해 상담받기" },
  { value: "practice_subscription", label: "연습실 정액권 문의", description: "정액 이용권 상담" },
  { value: "practice_room", label: "연습실 이용 문의", description: "일반 이용 문의" },
  { value: "other", label: "기타 문의", description: "기타 궁금한 점 남기기" },
];

export const CONTACT_METHOD_OPTIONS: Array<{ value: ContactMethod; label: string }> = [
  { value: "phone", label: "전화" },
  { value: "sms", label: "문자" },
  { value: "kakao", label: "카카오톡" },
];

export const LEVEL_OPTIONS = ["완전 초보", "기초 가능", "취미 경험 있음", "입시 / 전문 과정 경험"];
export const LESSON_GOAL_OPTIONS = ["취미", "기초 배우기", "좋아하는 곡 연주", "입시 준비", "밴드 / 실전 연주", "기타"];
export const DAY_OPTIONS = ["월", "화", "수", "목", "금", "토", "일"];
export const TIME_OPTIONS = ["오전", "오후", "저녁", "조율 가능"];
export const START_TIMING_OPTIONS = ["바로 시작", "이번 주", "이번 달", "조율 필요"];
export const LESSON_PLAN_OPTIONS = ["1회권", "1개월권", "3개월권", "6개월권", "12개월권"];
export const REGULAR_LESSON_PLAN_OPTIONS = ["1개월권", "3개월권", "6개월권", "12개월권"];
export const PRACTICE_PURPOSE_OPTIONS = ["개인 연습", "드럼 연습", "보컬 / 악기 연습", "기타"];
export const PRACTICE_TIME_BAND_OPTIONS = ["평일 낮", "평일 저녁", "주말", "유동적"];
export const USAGE_FREQUENCY_OPTIONS = ["주 1회", "주 2~3회", "거의 매일", "아직 미정"];
export const SUBSCRIPTION_PLAN_OPTIONS = ["월 정액권", "장기 정액권", "상담 후 결정"];

export const INQUIRY_STATUS_DEFAULT: InquiryStatus = "new";
export const INQUIRY_SOURCE_DEFAULT = "website_modal";

export function createInitialInquiryValues(): InquiryFormValues {
  return {
    inquiryType: "",
    name: "",
    phone: "",
    preferredContactMethod: "",
    preferredContactTime: "",
    message: "",
    level: "",
    lessonGoal: "",
    preferredDays: [],
    preferredTime: "",
    startTiming: "",
    interestedPlan: "",
    practicePurpose: "",
    usageFrequency: "",
    visitDate: "",
    participants: "",
    subject: "",
  };
}

export function formatPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

export function getInquiryTypeLabel(type: InquiryType | ""): string {
  if (!type) return "";
  return INQUIRY_TYPE_OPTIONS.find((option) => option.value === type)?.label ?? type;
}

export function validateInquiryForm(values: InquiryFormValues): { valid: boolean; errors: InquiryFormErrors } {
  const errors: InquiryFormErrors = {};

  if (!values.inquiryType) errors.inquiryType = "문의 유형을 선택해 주세요.";
  if (!values.name.trim()) errors.name = "이름을 입력해 주세요.";
  if (!values.phone.trim()) errors.phone = "연락처를 입력해 주세요.";
  if (values.phone.trim() && normalizePhone(values.phone).length < 10) errors.phone = "연락처 형식을 확인해 주세요.";
  if (!values.preferredContactMethod) errors.preferredContactMethod = "희망 연락 방식을 선택해 주세요.";
  if (!values.message.trim()) errors.message = "문의 내용을 입력해 주세요.";

  switch (values.inquiryType) {
    case "lesson_inquiry":
      if (!values.level) errors.level = "현재 수준을 선택해 주세요.";
      if (!values.lessonGoal) errors.lessonGoal = "수강 목적을 선택해 주세요.";
      if (!values.preferredDays.length) errors.preferredDays = "희망 요일을 1개 이상 선택해 주세요.";
      if (!values.preferredTime) errors.preferredTime = "희망 시간대를 선택해 주세요.";
      if (!values.startTiming) errors.startTiming = "희망 시작 시기를 선택해 주세요.";
      if (!values.interestedPlan) errors.interestedPlan = "관심 상품을 선택해 주세요.";
      break;
    case "trial_lesson":
      if (!values.level) errors.level = "현재 수준을 선택해 주세요.";
      if (!values.lessonGoal) errors.lessonGoal = "체험 목적을 선택해 주세요.";
      if (!values.preferredDays.length) errors.preferredDays = "희망 요일을 1개 이상 선택해 주세요.";
      if (!values.preferredTime) errors.preferredTime = "희망 시간대를 선택해 주세요.";
      break;
    case "regular_lesson":
      if (!values.level) errors.level = "현재 수준을 선택해 주세요.";
      if (!values.lessonGoal) errors.lessonGoal = "수강 목적을 선택해 주세요.";
      if (!values.preferredDays.length) errors.preferredDays = "희망 요일을 1개 이상 선택해 주세요.";
      if (!values.preferredTime) errors.preferredTime = "희망 시간대를 선택해 주세요.";
      if (!values.startTiming) errors.startTiming = "희망 시작 시기를 선택해 주세요.";
      if (!values.interestedPlan) errors.interestedPlan = "신청 상품을 선택해 주세요.";
      break;
    case "practice_subscription":
      if (!values.practicePurpose) errors.practicePurpose = "이용 목적을 선택해 주세요.";
      if (!values.preferredTime) errors.preferredTime = "희망 이용 시간대를 선택해 주세요.";
      if (!values.usageFrequency) errors.usageFrequency = "이용 빈도를 선택해 주세요.";
      if (!values.interestedPlan) errors.interestedPlan = "관심 상품을 선택해 주세요.";
      break;
    case "practice_room":
      if (!values.visitDate) errors.visitDate = "이용 희망 날짜를 선택해 주세요.";
      if (!values.preferredTime) errors.preferredTime = "이용 희망 시간대를 선택해 주세요.";
      if (!values.practicePurpose) errors.practicePurpose = "이용 목적을 선택해 주세요.";
      if (!values.participants) errors.participants = "예상 이용 인원을 입력해 주세요.";
      break;
    case "other":
      if (!values.subject.trim()) errors.subject = "문의 제목을 입력해 주세요.";
      break;
    default:
      break;
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function toInquiryInsert(values: InquiryFormValues) {
  const participants = values.participants ? Number(values.participants) : null;
  return {
    inquiry_type: values.inquiryType,
    name: values.name.trim(),
    phone: values.phone.trim(),
    preferred_contact_method: values.preferredContactMethod,
    preferred_contact_time: values.preferredContactTime.trim() || null,
    level: values.level || null,
    lesson_goal: values.lessonGoal || null,
    preferred_days: values.preferredDays.length ? values.preferredDays : null,
    preferred_time: values.preferredTime || null,
    start_timing: values.startTiming || null,
    interested_plan: values.interestedPlan || null,
    practice_purpose: values.practicePurpose || null,
    usage_frequency: values.usageFrequency || null,
    visit_date: values.visitDate || null,
    participants: Number.isFinite(participants) ? participants : null,
    subject: values.subject.trim() || null,
    message: values.message.trim(),
    status: INQUIRY_STATUS_DEFAULT,
    source: INQUIRY_SOURCE_DEFAULT,
  };
}
