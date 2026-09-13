-- Run this in the Supabase SQL editor after connecting the project.

create extension if not exists "pgcrypto";

insert into storage.buckets (id, name, public)
values
  ('ephemeral-snaps', 'ephemeral-snaps', false),
  ('insta-grid', 'insta-grid', true)
on conflict (id) do update
set public = excluded.public;

create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mode text not null check (mode in ('ephemeral', 'curated')),
  storage_path text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz
);

alter table public.photos enable row level security;

drop policy if exists "Users can read their own photos" on public.photos;
create policy "Users can read their own photos"
  on public.photos for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own photos" on public.photos;
create policy "Users can insert their own photos"
  on public.photos for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own photos" on public.photos;
create policy "Users can delete their own photos"
  on public.photos for delete
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can upload to their own photo folders" on storage.objects;
create policy "Users can upload to their own photo folders"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id in ('ephemeral-snaps', 'insta-grid')
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );

drop policy if exists "Users can read their own ephemeral snaps" on storage.objects;
create policy "Users can read their own ephemeral snaps"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'ephemeral-snaps'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );

drop policy if exists "Users can delete their own photos from storage" on storage.objects;
create policy "Users can delete their own photos from storage"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id in ('ephemeral-snaps', 'insta-grid')
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );