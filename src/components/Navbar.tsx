import {
    Avatar,
    Box,
    Button,
    Container,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
    useColorMode,
} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {CiDark, CiLight} from "react-icons/ci";
import {Icon} from '@chakra-ui/react'
import LanguageMenu from "./LanguageMenu.tsx";
import {useAuth} from "../context/AuthProvider.tsx";
import {HamburgerIcon, SearchIcon} from "@chakra-ui/icons";

const Navbar = () => {
    const {toggleColorMode, colorMode} = useColorMode()
    const {user, signInWithGoogle, logout} = useAuth()

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.log("errr", error);
        }
    };
    const { onOpen, isOpen, onClose } = useDisclosure();

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
                            display={{ base: "none", md: "flex" }}
                        >
                            <Link to="/">Home</Link>
                            <Link to="/movies">Movies</Link>
                            <Link to="/shows">TV Shows</Link>
                            <Link to="/search">
                                <SearchIcon fontSize={"xl"} />
                            </Link>
                            <Icon
                                as={colorMode === 'dark' ? CiLight : CiDark}
                                onClick={toggleColorMode}
                                cursor={"pointer"}
                                boxSize={5}
                            />
                            <LanguageMenu/>
                            {user && (
                                <Menu>
                                    <MenuButton>
                                        <Avatar
                                            bg={"red.500"}
                                            color={"white"}
                                            size={"sm"}
                                            name={user.email ||"User"}
                                            src={user?.photoURL || undefined}
                                        />
                                    </MenuButton>
                                    <MenuList>
                                        <Link to="/watchlist">
                                            <MenuItem>Watchlist</MenuItem>
                                        </Link>
                                        <MenuItem onClick={logout}>Logout</MenuItem>
                                    </MenuList>
                                </Menu>
                            )}
                            {!user && (
                                <Avatar
                                    size={"sm"}
                                    bg={"gray.800"}
                                    as="button"
                                    onClick={handleGoogleLogin}
                                />
                            )}
                        </Flex>
                        <Flex
                            display={{ base: "flex", md: "none" }}
                            alignItems={"center"}
                            gap="4"
                        >
                            <Link to="/search">
                                <SearchIcon fontSize={"xl"} />
                            </Link>
                            <Icon
                                as={colorMode === 'dark' ? CiLight : CiDark}
                                onClick={toggleColorMode}
                                cursor={"pointer"}
                                boxSize={5}
                            />
                            <LanguageMenu/>
                            <IconButton
                                icon={<HamburgerIcon />}
                                aria-label="Open menu"
                                onClick={onOpen}
                            />
                            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                                <DrawerOverlay />
                                <DrawerContent bg={"black"}>
                                    <DrawerCloseButton />
                                    <DrawerHeader>
                                        {user ? (
                                            <Flex alignItems="center" gap="2">
                                                <Avatar size={"sm"} name={user?.email ||""} />
                                                <Box fontSize={"sm"}>
                                                    {user?.displayName || user?.email}
                                                </Box>
                                            </Flex>
                                        ) : (
                                            <Avatar
                                                size={"sm"}
                                                bg="gray.800"
                                                as="button"
                                                onClick={handleGoogleLogin}
                                            />
                                        )}
                                    </DrawerHeader>

                                    <DrawerBody>
                                        <Flex flexDirection={"column"} gap={"4"} onClick={onClose}>
                                            <Link to="/">Home</Link>
                                            <Link to="/movies">Movies</Link>
                                            <Link to="/shows">TV Shows</Link>
                                            {user && (
                                                <>
                                                    <Link to="/watchlist">Watchlist</Link>
                                                    <Button
                                                        variant={"outline"}
                                                        onClick={logout}
                                                    >
                                                        Logout
                                                    </Button>
                                                </>
                                            )}
                                        </Flex>
                                    </DrawerBody>
                                </DrawerContent>
                            </Drawer>
                        </Flex>
                    </Flex>
                </Container>

            </Box>
        </>
    )
}
export default Navbar