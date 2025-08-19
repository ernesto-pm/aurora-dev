import { redirect } from '@remix-run/node'
import { createServerClient } from '@supabase/auth-helpers-remix'
import {getSupabaseCreds} from "~/services/envUtils";

export async function loader({ request, context }) {
    const {SUPABASE_URL, SUPABASE_ANON_KEY} = getSupabaseCreds(context)
    const response = new Response()
    const url = new URL(request.url)
    const code = url.searchParams.get('code')

    if (code) {
        const supabaseClient = createServerClient(
            SUPABASE_URL,
            SUPABASE_ANON_KEY,
            { request, response }
        )
        await supabaseClient.auth.exchangeCodeForSession(code)
    }

    return redirect('/', {
        headers: response.headers,
    })
}