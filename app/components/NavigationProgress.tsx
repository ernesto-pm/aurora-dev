import {useNavigation} from "@remix-run/react";

export default function NavigationProgress() {
    const transition = useNavigation();
    const isNavigating = transition.state !== "idle";

    if (!isNavigating) return null;

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            {/* Loading Bar Container */}
            <div className="h-2 w-full bg-gray-200 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-blue-300 to-purple-500 animate-progress"
                />
            </div>
            <style>{`
        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-progress {
          width: 50%;
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
