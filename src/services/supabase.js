import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://oproabhrvxbyshrejqth.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wcm9hYmhydnhieXNocmVqcXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2Mjg5NDMsImV4cCI6MjAyNzIwNDk0M30.j3edxLFqrSZ1nKoXIdQvqfPN5fpkRRWjMpP-N_QqIFs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
