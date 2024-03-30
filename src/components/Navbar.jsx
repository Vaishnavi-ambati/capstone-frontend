import { NavLink } from "react-router-dom"

export const NavBar = () => {
    return (
        <nav className="bg-white px-4 py-3 flex justify-between flex-wrap shadow-md rounded-b-md">
           <h1 className="bg-gradient-to-r from-green-800 to-green-900 text-transparent bg-clip-text">
                <NavLink to="/">ECO Tracker</NavLink>
            </h1>
            <ul className="flex items-center gap-4 md:gap-4 flex-wrap font-semibold">
                <li className="text-green-700 hover:bg-gradient-to-r hover:bg-gradient-to-r from-green-700 to-green-600 hover:text-transparent hover:bg-clip-text">
                   <NavLink to="/">Manager Login</NavLink> 
                </li>
                <li className="text-green-700 hover:bg-gradient-to-r hover:bg-gradient-to-r from-green-700 to-green-600 hover:text-transparent hover:bg-clip-text">
                   <NavLink to="/">Staff Login</NavLink> 
                </li>
                
            </ul>
        </nav>
    )
}