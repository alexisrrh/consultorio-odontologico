import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://eaulemnzsizbqsakkyif.supabase.co"
const supabaseKey = "sb_publishable__YGgc97YcZ9KgdcCzUDPFw_5XQQApEw"

export const supabase = createClient(supabaseUrl, supabaseKey)