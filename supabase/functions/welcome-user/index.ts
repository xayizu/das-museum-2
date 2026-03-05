// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts"

console.log("Hello from Functions!")

Deno.serve(async (req) => {
  try {
    const { name } = await req.json()
    
    // El "Cerebro" de la función decide el saludo
    const greetings = [
      `¡Bienvenido al frente, Comandante ${name}! Los archivos están listos para su inspección.`,
      `Saludos, Historiador ${name}. La memoria del acero le espera en el hangar.`,
      `Identidad verificada: ${name}. Acceso concedido a las piezas de archivo del Museo TAPI.`
    ]
    
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]

    const data = {
      message: randomGreeting,
      status: "authorized",
      access_level: "visitor_level_1",
      timestamp: new Date().toISOString()
    }

    return new Response(
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Faltan credenciales o nombre de usuario" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/welcome-user' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
