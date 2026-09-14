# Plataforma interna — puesta en marcha

Este documento describe cómo activar la plataforma interna (`/plataforma`) una vez que exista un proyecto Supabase dedicado a Noddo. El código ya está listo; solo falta conectarlo.

## 1. Crear el proyecto Supabase de Noddo

1. Entra a [supabase.com](https://supabase.com) con la cuenta que van a usar para Noddo (no la de un cliente).
2. Crea un proyecto nuevo (elige la región más cercana, ej. `us-east-1`).
3. Guarda la contraseña de la base de datos en un lugar seguro.

## 2. Correr la migración

En el panel de Supabase, ve a **SQL Editor** y pega el contenido completo de `supabase/migrations/0001_init.sql`, luego ejecútalo. Esto crea las tablas (`profiles`, `client_statuses`, `prospects`, `training_sessions`, `session_attendance`), sus políticas de seguridad (RLS), y el bucket de Storage `recordings` para las grabaciones.

## 3. Configurar variables de entorno

En **Project Settings → API** copia:
- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Local: copia `.env.local.example` a `.env.local` y pega los valores.

En Vercel (donde vive el sitio): agrega esas mismas dos variables en **Project Settings → Environment Variables**, y vuelve a desplegar.

## 4. Aumentar el límite de tamaño de archivo para grabaciones

Por defecto Supabase Storage limita el tamaño por archivo. Ve a **Project Settings → Storage** y sube el límite (ej. a 2–5 GB) para que quepan las grabaciones de Zoom de una clase completa. Si el proyecto está en el plan gratuito, probablemente necesiten pasar al **plan Pro** en cuanto se acumulen varias clases, porque el storage total gratuito es de solo 1 GB.

## 5. Crear las primeras cuentas

No hay pantalla de registro pública — las cuentas se crean a mano:

1. En **Authentication → Users**, da clic en "Add user" y crea la cuenta de Diego (correo + contraseña).
2. En **SQL Editor**, inserta su fila de perfil:
   ```sql
   insert into profiles (id, full_name, role)
   values ('<uuid del usuario creado arriba>', 'Diego', 'diego');
   ```
3. Repite para cada asesor, con `role = 'asesor'`.

## 6. Probar de punta a punta

Una vez conectado, hacer este recorrido:

1. Entrar a `/plataforma/login` como `diego` → crear un estatus nuevo en "Estatus".
2. Entrar como un `asesor` → agregar un prospecto y cambiarle el estatus.
3. Como `diego` → programar una sesión (con enlace de Zoom).
4. Como `asesor` → confirmar asistencia a esa sesión desde "Capacitación".
5. Como `diego` → reagendar la sesión con un clic, y subir un archivo de video de prueba como "grabación".
6. Como `asesor` → verificar que la grabación aparece y se reproduce en "Capacitación".
