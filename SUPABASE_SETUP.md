# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. https://supabase.com 접속 → **Start your project**
2. GitHub 로그인
3. **New Project** → 이름 입력 (예: `cosmetics-shop`)
4. Database Password 설정 (기억해두세요)
5. Region: **Northeast Asia (Seoul)** 선택
6. **Create new project** 클릭 (1~2분 소요)

## 2. 테이블 생성

프로젝트 대시보드 왼쪽 메뉴 **SQL Editor** 클릭 → 아래 SQL 붙여넣고 실행:

```sql
-- 브랜드 테이블
create table brands (
  id bigint generated always as identity primary key,
  name text not null,
  description text,
  image text,
  created_at timestamptz default now()
);

-- 제품 테이블
create table products (
  id bigint generated always as identity primary key,
  name text not null,
  brand text,
  price integer default 0,
  image text,
  description text,
  is_special boolean default false,
  discount_percentage integer,
  created_at timestamptz default now()
);

-- RLS 비활성화 (개발용, 프로덕션에서는 활성화 권장)
alter table brands enable row level security;
alter table products enable row level security;

create policy "Allow all for brands" on brands for all using (true) with check (true);
create policy "Allow all for products" on products for all using (true) with check (true);
```

## 3. Storage 버킷 생성 (이미지 업로드용)

1. 왼쪽 메뉴 **Storage** 클릭
2. **New bucket** → 이름: `products` → **Public bucket** 체크 → Create
3. **New bucket** → 이름: `brands` → **Public bucket** 체크 → Create

## 4. API 키 확인

1. 왼쪽 메뉴 **Settings** → **API**
2. **Project URL** 복사
3. **anon public** 키 복사

## 5. .env.local 파일 설정

프로젝트 루트의 `.env.local` 파일에 입력:

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

## 6. 실행

```bash
npm run dev
```

첫 실행 시 자동으로 기본 브랜드 5개, 제품 5개가 시드됩니다.
