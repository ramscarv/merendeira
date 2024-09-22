'use client'
import { useRouter } from "next/navigation";
import { logout } from "./controller/logoutButtonController";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        const { success, message } = await logout();
        if (success) {
            router.push('/');
        } else {
            alert(message);
        }
    };

    return (
        <div>
            <button
                onClick={handleLogout}
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-log-out"></i></span>
                <span className="text-sm font-medium">Sair</span>
            </button>
        </div>
    );
}
