import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import HomeScreen from "../pages/HomeScreen.tsx";
import Movies from "../pages/movies/Movies.tsx";
import Shows from "../pages/shows/Show.tsx";
import Search from "../pages/search/Search.tsx";
import Details from "../pages/details";
import ProtectedRouterProvider from "./ProtectedRouterProvider.tsx";
import Watchlist from "../pages/Watchlist.tsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <HomeScreen/>
            },
            {
                path: '/movies',
                element: <Movies/>
            },
            {
                path: "/shows",
                element: <Shows/>
            },
            {
                path: "/search",
                element: <Search/>
            },
            {
                path:'/:type/:id',
                element:<Details/>
            },
            {
                path: "/watchlist",
                element: (
                    <ProtectedRouterProvider>
                        <Watchlist/>
                    </ProtectedRouterProvider>
                ),
            }
        ]

    }
])

export default routes