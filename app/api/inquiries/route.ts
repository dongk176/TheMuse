import { NextResponse } from "next/server";
import {
  type InquiryFormValues,
  INQUIRY_SOURCE_DEFAULT,
  INQUIRY_STATUS_DEFAULT,
  toInquiryInsert,
  validateInquiryForm,
} from "@/lib/inquiry";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InquiryFormValues;
    const { valid, errors } = validateInquiryForm(body);

    if (!valid) {
      return NextResponse.json(
        { ok: false, message: "입력값을 확인해 주세요.", errors },
        { status: 400 },
      );
    }

    const insertPayload = toInquiryInsert(body);
    const { data, error } = await supabaseAdmin
      .schema("themuse")
      .from("inquiries")
      .insert(insertPayload)
      .select("id, inquiry_type, name, phone, status, source, created_at")
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, message: "문의 저장 중 오류가 발생했습니다.", detail: error.message },
        { status: 500 },
      );
    }

    await supabaseAdmin.schema("themuse").from("inquiry_status_logs").insert({
      inquiry_id: data.id,
      from_status: null,
      to_status: INQUIRY_STATUS_DEFAULT,
      changed_by: "system",
      note: `${INQUIRY_SOURCE_DEFAULT} initial create`,
    });

    return NextResponse.json({ ok: true, inquiry: data }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "요청 처리 중 알 수 없는 오류가 발생했습니다.";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
