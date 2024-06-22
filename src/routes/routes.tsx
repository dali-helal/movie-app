import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import HomeScreen from "../pages/HomeScreen.tsx";
import Movies from "../pages/movies/Movies.tsx";
import Show from "../pages/shows/Show.tsx";
import Search from "../pages/search/Search.tsx";


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
                element: <Show/>
            },
            {
                path: "/search",
                element: <Search/>
            },
        ]

    }
])

export default routes