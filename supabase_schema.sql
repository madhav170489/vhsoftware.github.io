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

-- Computations Table
create table if not exists computations (
  id uuid primary key default gen_random_uuid(),
  assessee_id uuid references assesses(id),
  ay text not null,
  salary_income numeric,
  business_income numeric,
  other_income numeric,
  deductions numeric,
  total_income numeric,
  tax numeric,
  created_at timestamp default now()
);

-- Profit & Loss Table
create table if not exists pnl (
  id uuid primary key default gen_random_uuid(),
  assessee_id uuid references assesses(id),
  ay text not null,
  gross_receipts numeric,
  expenses numeric,
  net_profit numeric,
  created_at timestamp default now()
);

-- Balance Sheet Table
create table if not exists balancesheet (
  id uuid primary key default gen_random_uuid(),
  assessee_id uuid references assesses(id),
  ay text not null,
  assets numeric,
  liabilities numeric,
  capital numeric,
  created_at timestamp default now()
);