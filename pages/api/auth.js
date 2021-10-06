import { supabase } from "../../api";

export default function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res);
}
