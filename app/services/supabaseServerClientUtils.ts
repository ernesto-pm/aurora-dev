import {getSupabaseCreds} from "~/services/envUtils";
import {createServerClient, parseCookieHeader, serializeCookieHeader} from "@supabase/ssr";
import {AppLoadContext} from "@remix-run/cloudflare";

export async function getSupabaseAccessToken(request: Request<unknown, CfProperties<unknown>>, context: AppLoadContext) {
    const {SUPABASE_URL, SUPABASE_ANON_KEY} = getSupabaseCreds(context)
    const headers = new Headers()

    const supabase = createServerClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY,
        {
            cookies: {
                //@ts-expect-error Error weird api ?
                getAll() {
                    return parseCookieHeader(request.headers.get('Cookie') ?? '')
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach((
                        {name, value, options}
                    ) => headers.append('Set-Cookie', serializeCookieHeader(name, value, options)))
                },
            },
        })

    const {data: {session}} = await supabase.auth.getSession()
    if (!session) throw new Error("Error, no access token found")

    const accessToken = session.access_token

    return accessToken
}
