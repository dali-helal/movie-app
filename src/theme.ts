import {extendTheme, ThemeConfig, ThemeOverride,StyleFunctionProps} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

const styles: ThemeOverride["styles"] = {
    global: (props) => ({
        body: {
            bg: mode(
                props.theme.semanticTokens.colors["chakra-body-bg"]?._light || "white",
                "gray.900"
            )(props),
        },
    }),
};

const theme = extendTheme({
    config,
    styles,
    components: {
        Card: {
            baseStyle: {
                bg: (props: StyleFunctionProps) => mode("gray.200", "gray.800")(props),
                color: (props: StyleFunctionProps) => mode("gray.800", "white")(props),
            },
        },
        Text:{
            baseStyle:{
                color: (props: StyleFunctionProps) => mode("white", "white")(props),
            },
        },
    }
});

export default theme;
