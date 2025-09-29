/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import {client as auroraClient} from "~/services/aurora/client.gen";
import {client as auroraDataserverClient} from "~/services/aurora-data-server/client.gen"

if (process.env.NODE_ENV === "development") {
    auroraClient.setConfig({baseURL: 'http://127.0.0.1:8000/aurora'})
    auroraDataserverClient.setConfig({ baseURL: 'http://127.0.0.1:8001' })
} else {
    auroraClient.setConfig({baseURL: 'https://animus-backend-enuz8.ondigitalocean.app/aurora'})
    auroraDataserverClient.setConfig({ baseURL: 'https://aurora-data-server-y63zh.ondigitalocean.app' })
}


startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});
