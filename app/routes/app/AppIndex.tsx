import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
import {BriefcaseBusiness, CircleUserRound} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "~/components/ui/alert";
import {Link} from "@remix-run/react";

export default function AppIndex() {
    return (
        <div className="flex flex-col h-full w-full">
            <AppNavigationHeader headerTitle="Bienvenido/a a Aurora"/>

            <div className="flex-1 overflow-y-auto px-10 py-5 flex flex-col gap-5">
                <div className="flex flex-row gap-4 flex-wrap">
                    <div className="rounded-lg p-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500">
                        <Alert className="border-none bg-none">
                            <CircleUserRound className="w-5"/>
                            <AlertTitle>Completa tu perfil</AlertTitle>
                            <AlertDescription>
                                Aurora funciona mejor conforme mas información tenga sobre ti, completa tu perfil <Link to="/app/profile" className="text-blue-600 underline">aquí</Link>.
                            </AlertDescription>
                        </Alert>
                    </div>

                    <div className="rounded-lg p-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500">
                        <Alert className="border-none bg-none">
                            <BriefcaseBusiness className="w-5"/>
                            <AlertTitle>Añade los detalles de tú negocio.</AlertTitle>
                            <AlertDescription>
                                Aurora funciona mejor conforme mas información tenga sobre tu negocio, completalo <span className="text-blue-600 underline">aquí</span>.
                            </AlertDescription>
                        </Alert>
                    </div>
                </div>

                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    {Array.from({ length: 24 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}