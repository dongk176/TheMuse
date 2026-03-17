-- THE MUSE dedicated schema for inquiry system (shared Supabase project safe namespace)
create schema if not exists themuse;

create table if not exists themuse.inquiries (
  id uuid primary key default gen_random_uuid(),
  inquiry_type text not null check (
    inquiry_type in (
      'lesson_inquiry',
      'trial_lesson',
      'regular_lesson',
      'practice_subscription',
      'practice_room',
      'other'
    )
  ),
  name text not null,
  phone text not null,
  guardian_phone text null,
  preferred_contact_method text not null check (preferred_contact_method in ('phone', 'sms', 'kakao')),
  preferred_contact_time text null,
  level text null,
  lesson_goal text null,
  preferred_days text[] null,
  preferred_time text null,
  start_timing text null,
  interested_plan text null,
  practice_purpose text null,
  usage_frequency text null,
  visit_date date null,
  participants integer null,
  subject text null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'consulting', 'converted', 'on_hold')),
  source text not null default 'website_modal',
  internal_memo text null,
  deleted_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_themuse_inquiries_created_at on themuse.inquiries(created_at desc);
create index if not exists idx_themuse_inquiries_status on themuse.inquiries(status);
create index if not exists idx_themuse_inquiries_inquiry_type on themuse.inquiries(inquiry_type);

create table if not exists themuse.inquiry_status_logs (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null references themuse.inquiries(id) on delete cascade,
  from_status text null,
  to_status text not null,
  changed_by text null,
  note text null,
  created_at timestamptz not null default now()
);

create index if not exists idx_themuse_inquiry_status_logs_inquiry_id
  on themuse.inquiry_status_logs(inquiry_id, created_at desc);

create or replace function themuse.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_themuse_inquiries_set_updated_at on themuse.inquiries;
create trigger trg_themuse_inquiries_set_updated_at
before update on themuse.inquiries
for each row
execute function themuse.set_updated_at();

alter table themuse.inquiries enable row level security;
alter table themuse.inquiry_status_logs enable row level security;

drop policy if exists "themuse_insert_inquiries_public" on themuse.inquiries;
create policy "themuse_insert_inquiries_public"
on themuse.inquiries
for insert
to anon, authenticated
with check (true);

-- 관리자 조회/수정은 service_role 또는 별도 관리자 정책으로 확장
