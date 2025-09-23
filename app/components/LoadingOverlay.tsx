import { useNavigation } from "@remix-run/react";

export function LoadingOverlay() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading" || navigation.state === "submitting";

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex flex-col items-center space-y-4">
                {/* Spinner */}
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-white text-lg font-medium">Cargando, por favor espera un momento...</p>
            </div>
        </div>
    );
}