import {Box, Flex, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import { GiGlobe } from "react-icons/gi";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import React from "react";

const LanguageMenu = () => {
    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        lang: string
    ) => {
        event.preventDefault();
        i18n.changeLanguage(lang);
    };

    //const currentLanguage = i18n.language === "en" ? "English" : "French";

    return (
        <>
            <Menu>
                <MenuButton fontSize={"14"}>
                    <Flex>
                        <GiGlobe size={18}/>
                    </Flex>
                </MenuButton>
                <MenuList>
                    <MenuItem
                        minH="40px"
                        color="black"
                        onClick={(e) => handleChangeLanguage(e, "en")}
                    >
                        <ReactCountryFlag className="country-flag" countryCode="us" svg />
                        <Box ml={4}>{t("English")}</Box>
                    </MenuItem>
                    <MenuItem
                        minH="40px"
                        color="black"
                        onClick={(e) => handleChangeLanguage(e, "fr")}
                    >
                        <ReactCountryFlag countryCode="fr" svg />
                        <Box ml={4}>{t("French")}</Box>
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
};

export default LanguageMenu;
