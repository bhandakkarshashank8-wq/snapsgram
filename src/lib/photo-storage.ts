import { supabase, isSupabaseConfigured } from './supabase';

export type PhotoMode = 'ephemeral' | 'curated';

const bucketForMode: Record<PhotoMode, string> = {
  ephemeral: 'ephemeral-snaps',
  curated: 'insta-grid',
};

export async function uploadPhoto({
  uri,
  userId,
  mode,
}: {
  uri: string;
  userId: string;
  mode: PhotoMode;
}) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured for this build.');
  }

  const response = await fetch(uri);
  const body = await response.arrayBuffer();
  const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;
  const bucket = bucketForMode[mode];

  const { error: uploadError } = await supabase.storage.from(bucket).upload(path, body, {
    contentType: 'image/jpeg',
    upsert: false,
  });

  if (uploadError) {
    throw uploadError;
  }

  const { data, error: recordError } = await supabase
    .from('photos')
    .insert({
      user_id: userId,
      mode,
      storage_path: path,
      expires_at:
        mode === 'ephemeral'
          ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          : null,
    })
    .select('id, storage_path, mode, expires_at')
    .single();

  if (recordError) {
    await supabase.storage.from(bucket).remove([path]);
    throw recordError;
  }

  return data;
}