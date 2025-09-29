import GraphChart from "~/components/widgets/GraphChart";
import { MessageCircle } from "lucide-react";

export default function MockGroupedProductsWidget() {
    return (
        <div className="p-[2px] rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 shadow-md h-full w-full">
            <div className="rounded-lg bg-sidebar flex flex-col gap-2 h-full w-full">
                <div className="px-4 py-2 bg-sidebar-accent rounded-t-lg flex flex-row items-center">
                    <div className="flex-1 text-sm font-semibold">
                        Related products
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        {/* AI Badge */}
                        <span className="text-[10px] font-bold uppercase bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-0.5 rounded-full shadow">
                            AI
                        </span>

                        {/* Chatbot Button */}
                        <button
                            type="button"
                            className="flex items-center justify-center rounded-full p-1.5 bg-gradient-to-r from-blue-500 to-green-500 text-white shadow hover:opacity-90 transition"
                            title="Open Assistant"
                        >
                            <MessageCircle className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 p-2">
                    <GraphChart />
                </div>
            </div>
        </div>
    )
}
