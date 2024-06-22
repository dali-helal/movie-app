import ReactDOM from 'react-dom/client';

// ** i18n
import './services/i18n/index.ts'

import './index.css';

// chakra ui configuration
import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import theme from './theme';

// router configuration
import {RouterProvider} from "react-router-dom";
import routes from "./routes/routes.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <RouterProvider router={routes}/>
    </ChakraProvider>
);
