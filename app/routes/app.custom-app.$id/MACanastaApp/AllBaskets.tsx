import {useQuery} from "@tanstack/react-query";
import {getAllBasketsOptions} from "~/services/aurora/@tanstack/react-query.gen";

export default function AllBaskets() {
    const {data, error, isLoading, isError} = useQuery({...getAllBasketsOptions()})

    if (isLoading) return <div>Cargando datos...</div>
    if (isError) return <div>Ocurrio un error al obtener informacion sobre canastas... {error.message}</div>
    if (!data) return <div>No hay datos de canastas disponibles</div>

    return (
        <div>
            {
                data.map(
                    (basket) => (
                        <div key={basket.id}>
                            {basket.name}
                        </div>
                    )
                )
            }
        </div>
    )
}