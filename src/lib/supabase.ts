import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://zjiwnfkpwywkkqwpemgy.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJiODdhZTVhLTdiMzItNDY4My05ZGVjLTI4MThjYmIyYzk5MiJ9.eyJwcm9qZWN0SWQiOiJ6aml3bmZrcHd5d2trcXdwZW1neSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzcxNDU0NzQ3LCJleHAiOjIwODY4MTQ3NDcsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.WlGp5HcS2uqqIJy4_9zn5a-k9k0NqwFCRQeBNI7g7q8';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };