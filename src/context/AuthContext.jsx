import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../servicios/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function inicializarSesion() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;
        if (!mounted) return;

        setUsuario(session?.user ?? null);

        if (!session?.user) {
          setPerfil(null);
        }
      } catch (error) {
        console.error("Error obteniendo sesión:", error);
        if (mounted) {
          setUsuario(null);
          setPerfil(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    inicializarSesion();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const nuevoUsuario = session?.user ?? null;

      setUsuario(nuevoUsuario);

      if (!nuevoUsuario) {
        setPerfil(null);
      }

      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function cargarPerfil() {
      if (!usuario) {
        if (mounted) setPerfil(null);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", usuario.id)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          const { error: insertError } = await supabase.from("profiles").insert([
            {
              id: usuario.id,
              nombre: usuario.user_metadata?.nombre || "Usuario",
              rol: usuario.user_metadata?.rol || "cliente",
            },
          ]);

          if (insertError) throw insertError;

          const { data: nuevoPerfil, error: nuevoError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", usuario.id)
            .single();

          if (nuevoError) throw nuevoError;

          if (mounted) setPerfil(nuevoPerfil);
          return;
        }

        if (mounted) setPerfil(data);
      } catch (error) {
        console.error("Error cargando perfil:", error);
        if (mounted) setPerfil(null);
      }
    }

    cargarPerfil();

    return () => {
      mounted = false;
    };
  }, [usuario]);

  return (
    <AuthContext.Provider value={{ usuario, perfil, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}