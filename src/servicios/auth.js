import { supabase } from "./supabase";

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

export async function cerrarSesion() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

