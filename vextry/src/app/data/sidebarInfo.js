import { HiOutlineHome } from "react-icons/hi2";
import { FiUsers, FiMessageSquare, FiMenu, FiBell, FiSettings, FiSearch } from "react-icons/fi";
import { MdOutlineForum } from "react-icons/md";


export const sidebarInfo = [
    {
        id: 0,
        name: "",
        icon: <img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain rounded-full border-2 border-[#1c7e42]" />,
        className: "flex items-center justify-center hover:bg-transparent"
    },
    {
        id: 1,
        name: "Inicio",
        icon: <HiOutlineHome size={24} />,
        className: "flex"
    },
    {
        id: 2,
        name: "Club",
        icon: <FiUsers size={24} />,
        className: "flex"
    },
    {
        id: 3,
        name: "Foro",
        icon: <MdOutlineForum size={24} />,
        className: "flex"
    },
    {
        id: 4,
        name: "Mensajes",
        icon: <FiMessageSquare size={24} />,
        className: "flex"
    },
    {
        id: 5,
        name: "Buscar",
        icon: <FiSearch size={24} />,
        className: "hidden md:flex"
    },
    {
        id: 6,
        name: "Notificaciones",
        icon: <FiBell size={24} />,
        className: "hidden md:flex mt-auto"
    },
    {
        id: 7,
        name: "Ajustes",
        icon: <FiSettings size={24} />,
        className: "hidden md:flex"
    },
    {
        id: 8,
        name: "Más",
        icon: <FiMenu size={24} />,
        className: "flex md:hidden"
    }
];