import { useLocalStorage } from './useLocalStorage';

export const useSidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useLocalStorage('sidebarOpen', true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return {
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar
    };
};