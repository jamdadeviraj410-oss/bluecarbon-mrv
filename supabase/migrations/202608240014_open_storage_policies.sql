-- Migration 14: Enable Public Access on Storage Buckets

UPDATE storage.buckets SET public = true WHERE id = 'evidence-vault';

DROP POLICY IF EXISTS "Evidence Vault Public Select" ON storage.objects;
CREATE POLICY "Evidence Vault Public Select" ON storage.objects
    FOR SELECT TO public USING (bucket_id = 'evidence-vault');

DROP POLICY IF EXISTS "Evidence Vault Public Insert" ON storage.objects;
CREATE POLICY "Evidence Vault Public Insert" ON storage.objects
    FOR INSERT TO public WITH CHECK (bucket_id = 'evidence-vault');

DROP POLICY IF EXISTS "Evidence Vault Public Update" ON storage.objects;
CREATE POLICY "Evidence Vault Public Update" ON storage.objects
    FOR UPDATE TO public USING (bucket_id = 'evidence-vault');
