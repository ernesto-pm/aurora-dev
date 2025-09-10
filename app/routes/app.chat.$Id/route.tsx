import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Preguntale a Aurora" }
    ];
};

export default function Chat() {
    return (
        <div>
            <AppNavigationHeader headerTitle="Preguntale a Aurora"/>

            <div className="flex flex-col gap-5 w-full h-full items-start p-10 py-5">
                Estas en el chat, bienvenido/a!
            </div>
        </div>
    )
}