import {AppLoadContext} from "@remix-run/cloudflare";

export function getSupabaseCreds(context: AppLoadContext) {
    const returnObj = {
        SUPABASE_URL: "",
        SUPABASE_ANON_KEY: ""
    }

    if (process.env.NODE_ENV === "development") {
        returnObj.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!
        returnObj.SUPABASE_URL = process.env.SUPABASE_URL!
    } else {
        // @ts-expect-error Error invalid key
        returnObj.SUPABASE_ANON_KEY = context.cloudflare.env.SUPABASE_ANON_KEY!
        // @ts-expect-error Error invalid key
        returnObj.SUPABASE_URL = context.cloudflare.env.SUPABASE_URL!
    }

    return returnObj
}