-- First, let's make sure we have the post_status enum type
DO $$ BEGIN
    CREATE TYPE post_status AS ENUM ('draft', 'scheduled', 'published', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create or update the posts table with all necessary fields
DO $$ 
BEGIN
    -- Add any missing columns to posts table
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'ayrshare_post_id') THEN
        ALTER TABLE posts ADD COLUMN ayrshare_post_id TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'profile_key') THEN
        ALTER TABLE posts ADD COLUMN profile_key TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'error_message') THEN
        ALTER TABLE posts ADD COLUMN error_message TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'scheduled_for') THEN
        ALTER TABLE posts ADD COLUMN scheduled_for TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- Add trigger for updated_at if it doesn't exist
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Update RLS policies for posts to ensure proper access
DROP POLICY IF EXISTS "Users can insert their own posts" ON posts;
CREATE POLICY "Users can insert their own posts" 
ON posts FOR INSERT 
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own posts" ON posts;
CREATE POLICY "Users can update their own posts" 
ON posts FOR UPDATE 
USING (auth.uid() = user_id OR 
       EXISTS (SELECT 1 FROM team_members tm 
               WHERE tm.team_id = posts.team_id 
               AND tm.user_id = auth.uid() 
               AND tm.role IN ('owner', 'admin', 'editor')));