import { createContext, useContext, useState, ReactNode } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "~/components/ui/alert-dialog";

export interface AlertDialogConfig {
    title: string;
    description: string;
    variant?: 'success' | 'error' | 'warning' | 'info';
    actionText?: string;
    onAction?: () => void;
}

interface AlertDialogContextType {
    openDialog: (config: AlertDialogConfig) => void;
    closeDialog: () => void;
}

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined);

export const useAlertDialog = () => {
    const context = useContext(AlertDialogContext);
    if (!context) {
        throw new Error('useAlertDialog must be used within an AlertDialogProvider');
    }
    return context;
};

export const AlertDialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dialogConfig, setDialogConfig] = useState<AlertDialogConfig | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = (config: AlertDialogConfig) => {
        setDialogConfig(config);
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        // Small delay to allow close animation
        setTimeout(() => setDialogConfig(null), 150);
    };

    const handleAction = () => {
        if (dialogConfig?.onAction) {
            dialogConfig.onAction();
        }
        closeDialog();
    };

    // Variant styles - you can customize these
    const getVariantStyles = (variant: string) => {
        switch (variant) {
            default:
                return ''

            /*
            case 'success':
                return 'text-green-600 dark:text-green-400';
            case 'error':
                return 'text-red-600 dark:text-red-400';
            case 'warning':
                return 'text-yellow-600 dark:text-yellow-400';
            case 'info':
                return 'text-blue-600 dark:text-blue-400';
            default:
                return '';
             */

        }
    };

    return (
        <AlertDialogContext.Provider value={{ openDialog, closeDialog }}>
            {children}

            {/* Global AlertDialog */}
            {dialogConfig && (
                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className={getVariantStyles(dialogConfig.variant || 'info')}>
                                {dialogConfig.title}
                            </AlertDialogTitle>
                            <AlertDialogDescription className={getVariantStyles(dialogConfig.variant || 'info')}>
                                {dialogConfig.description}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction onClick={handleAction}>
                                {dialogConfig.actionText || 'Ok'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </AlertDialogContext.Provider>
    );
};