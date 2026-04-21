import { supabase } from "./supabase";

const appUrl =
  import.meta.env.VITE_APP_URL || "https://consultorio-odontologico-lac.vercel.app";

export async function registrarCliente({ email, password, nombre }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nombre,
        rol: "cliente",
      },
    },
  });

  if (error) throw error;
  return data;
}

export async function loginUsuario({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function enviarRecuperacionPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${appUrl}/actualizar-password`,
  });

  if (error) throw error;
  return data;
}

export async function actualizarPasswordNueva(password) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;
  return data;
}

export async function cerrarSesion() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}