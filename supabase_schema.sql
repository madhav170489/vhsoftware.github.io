-- Assesses Table
create table if not exists assesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  pan text unique not null,
  dob date,
  mobile text,
  email text,
  created_at timestamp default now()
);