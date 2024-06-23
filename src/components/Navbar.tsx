import {Box, Container, Flex, useColorMode} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {CiDark, CiLight} from "react-icons/ci";
import {Icon} from '@chakra-ui/react'
import LanguageMenu from "./LanguageMenu.tsx";

const Navbar = () => {
    const {toggleColorMode,colorMode} = useColorMode()
    return (
        <>
            <Box py={4} mb={2}>
                <Container maxW={"container.xl"}>
                    <Flex justifyContent={"space-between"}>
                        <Link to="/">
                            <Box
                                fontSize={"2xl"}
                                fontWeight={"bold"}
                                color={"red"}
                                letterSpacing={"widest"}
                                fontFamily={"mono"}
                            >
                                STREAMIFY
                            </Box>
                        </Link>

                        <Flex
                            gap="4"
                            alignItems={"center"}
                        >
                            <Link to="/">Home</Link>
                            <Link to="/movies">Movies</Link>
                            <Link to="/shows">TV Shows</Link>
                            <Link to="/search">Search</Link>
                            <Icon
                                as={colorMode === 'dark' ? CiLight : CiDark}
                                onClick={toggleColorMode}
                                cursor={"pointer"}
                                boxSize={5}
                            />
                            <LanguageMenu/>
                        </Flex>

                    </Flex>
                </Container>

            </Box>
        </>
    )
}
export default Navbar