import {Info} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {getBusinessesDataConnectionsForSupabaseUserOptions} from "~/services/aurora/@tanstack/react-query.gen";
import {useOutletContext} from "@remix-run/react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";

interface DataConnectionSelectorProps {
    selectedValue?: string;
    onValueChange?: (value: string) => void;
}

export default function DataConnectionSelector({ selectedValue, onValueChange }: DataConnectionSelectorProps) {
    const {accessToken} = useOutletContext<{accessToken: string}>()
    const {data, isLoading, isError, error} = useQuery({
        ...getBusinessesDataConnectionsForSupabaseUserOptions({
            headers: {
                'Authorization': `bearer ${accessToken}`
            },
            throwOnError: true
        })
    })

    if (isLoading || data === undefined) return <div>Cargando datos...</div>
    if (isError) return <div>{error.message}</div>
    if (!data || data.length === 0) return <div>No cuentas con ninguna conexion de datos disponible...</div>

    return (
        <div className="flex flex-col gap-5">
            <div className="text-lg font-semibold">
                3. Selecciona la conexion de datos que deseas utilizar
            </div>

            <div className="flex flex-row items-center gap-x-1">
                <div className="text-sm text-muted-foreground">
                    <Info className="h-4"/>
                </div>

                <div className="text-sm text-muted-foreground">
                    El asistente necesita acceso a informacion de tu negocio para lograr su objetivo, selecciona los datos a los que quieres conectar a este asistente.
                </div>
            </div>

            <div className="flex flex-row gap-5">
                <Select value={selectedValue} onValueChange={onValueChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleciona la conexion de datos"/>
                    </SelectTrigger>
                    <SelectContent>
                        {
                            data.map(
                                (connectionAndBusiness) => {
                                    const value = `${connectionAndBusiness.business_id};${connectionAndBusiness.connection_id}`
                                    const displayValue = `${connectionAndBusiness.business_name} - ${connectionAndBusiness.data_source_display_name}`

                                    return (
                                        <SelectItem key={value} value={value} className="whitespace-normal break-words pr-2">
                                            {displayValue}
                                        </SelectItem>
                                    )
                                }
                            )
                        }
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}