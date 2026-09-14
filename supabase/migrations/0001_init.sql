-- Plataforma interna NODDO Software: CRM de asesores + panel de capacitación de Diego.

create type user_role as enum ('admin', 'diego', 'asesor');
-- 'admin' se deja disponible para el futuro; hoy solo se usan 'diego' y 'asesor'.

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  role user_role not null default 'asesor',
  created_at timestamptz not null default now()
);

create table client_statuses (
  id uuid primary key default gen_random_uuid(),
  label text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

insert into client_statuses (label, sort_order) values
  ('Prospección', 1),
  ('En espera de respuesta', 2),
  ('Cerrado', 3);

create table prospects (
  id uuid primary key default gen_random_uuid(),
  advisor_id uuid not null references profiles (id),
  business_name text not null,
  contact_name text,
  phone text,
  email text,
  notes text,
  status_id uuid not null references client_statuses (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table training_sessions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  scheduled_at timestamptz not null,
  zoom_link text,
  status text not null default 'programada',
  recording_url text,
  created_by uuid not null references profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table session_attendance (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references training_sessions (id) on delete cascade,
  advisor_id uuid not null references profiles (id),
  confirmed boolean not null default false,
  confirmed_at timestamptz,
  attended boolean,
  unique (session_id, advisor_id)
);

-- Helper: rol del usuario autenticado, usado por las policies de abajo.
create function current_user_role() returns user_role
language sql stable security definer
set search_path = public
as $$
  select role from profiles where id = auth.uid();
$$;

alter table profiles enable row level security;
alter table client_statuses enable row level security;
alter table prospects enable row level security;
alter table training_sessions enable row level security;
alter table session_attendance enable row level security;

-- profiles
create policy "profiles: leer la propia" on profiles
  for select using (id = auth.uid());
create policy "profiles: diego lee todas" on profiles
  for select using (current_user_role() = 'diego');

-- client_statuses
create policy "estatus: cualquier autenticado lee" on client_statuses
  for select using (auth.uid() is not null);
create policy "estatus: diego administra" on client_statuses
  for all using (current_user_role() = 'diego')
  with check (current_user_role() = 'diego');

-- prospects
create policy "prospectos: asesor ve los propios" on prospects
  for select using (advisor_id = auth.uid());
create policy "prospectos: diego ve todos" on prospects
  for select using (current_user_role() = 'diego');
create policy "prospectos: asesor crea los propios" on prospects
  for insert with check (advisor_id = auth.uid());
create policy "prospectos: asesor edita los propios" on prospects
  for update using (advisor_id = auth.uid()) with check (advisor_id = auth.uid());

-- training_sessions
create policy "sesiones: cualquier autenticado lee" on training_sessions
  for select using (auth.uid() is not null);
create policy "sesiones: diego administra" on training_sessions
  for all using (current_user_role() = 'diego')
  with check (current_user_role() = 'diego');

-- session_attendance
create policy "asistencia: asesor ve/edita la propia" on session_attendance
  for select using (advisor_id = auth.uid());
create policy "asistencia: asesor confirma la propia" on session_attendance
  for insert with check (advisor_id = auth.uid());
create policy "asistencia: asesor actualiza la propia" on session_attendance
  for update using (advisor_id = auth.uid()) with check (advisor_id = auth.uid());
create policy "asistencia: diego ve y marca todas" on session_attendance
  for all using (current_user_role() = 'diego')
  with check (current_user_role() = 'diego');

-- Storage: bucket privado para las grabaciones que sube Diego.
insert into storage.buckets (id, name, public)
values ('recordings', 'recordings', false)
on conflict (id) do nothing;

create policy "recordings: diego sube" on storage.objects
  for insert with check (bucket_id = 'recordings' and current_user_role() = 'diego');
create policy "recordings: diego administra" on storage.objects
  for all using (bucket_id = 'recordings' and current_user_role() = 'diego')
  with check (bucket_id = 'recordings' and current_user_role() = 'diego');
create policy "recordings: cualquier autenticado lee" on storage.objects
  for select using (bucket_id = 'recordings' and auth.uid() is not null);
