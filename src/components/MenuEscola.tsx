import LogoutButton from "@/utils/logoutButton/logoutButton";
import Image from "next/image";

export default function MenuEscola() {

    return (
        <div>
            <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />
            <div className="h-svh flex flex-row bg-cor1">
                <div className="flex flex-col bg-gray-100">
                    <div className="flex items-center justify-center shadow-md bg-white p-4">
                    <img src="https://media.istockphoto.com/id/1343392632/vector/healthy-food-book-logo-concept-design.jpg?s=612x612&w=0&k=20&c=s_q740z0ENq3hQeBVF37JQG1rmTQ4wB-NYj1ZPYEQw0=" alt="logo merenda" width={96} height={96} />
                    </div>
                    <div className="h-svh flex flex-col justify-between w-56 bg-white overflow-hidden">
                        <ul className="flex flex-col py-1">
                            <li>
                                <a href="../escola/" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-search-alt"></i></span>
                                    <span className="text-sm font-medium">Controle de estoque</span>
                                </a>
                            </li>

                            <li>
                                <a href="../escola/cadastrar-estoque/" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-plus"></i></span>
                                    <span className="text-sm font-medium">Cadastrar estoque</span>
                                </a>
                            </li>
                            <li>
                                <a href="../escola/cadastrar-refeicao/" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className='bx bx-dish'></i></span>
                                    <span className="text-sm font-medium">Produção de refeição</span>
                                </a>
                            </li>
                            
                        </ul>
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </div>
    )
}