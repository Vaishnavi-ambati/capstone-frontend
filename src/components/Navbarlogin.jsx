import { NavLink } from "react-router-dom"

export const Navbarlogin = () => {
    return (
        <nav className="bg-white px-4 py-3 flex justify-between flex-wrap shadow-md rounded-b-md">
           <h1 className="bg-gradient-to-r from-green-800 to-green-900 text-transparent bg-clip-text">
                <NavLink to="/">ECO Tracker</NavLink>
            </h1>
        </nav>
    )
}