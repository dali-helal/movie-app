//import React from 'react';
import Layout from "./components/Layout.tsx";
import {Outlet} from "react-router-dom";
//import { useColorMode,} from '@chakra-ui/react';
//const { toggleColorMode} = useColorMode();

const App = () => {


    return (
      <Layout>
         <Outlet/>
      </Layout>
    );
};
export default App;

