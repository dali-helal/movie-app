import {Button, Flex, Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {Dispatch, SetStateAction} from "react";
import {ArrowBackIcon, ArrowForwardIcon} from "@chakra-ui/icons";

interface PaginationProps{
    activePage:number
    totalPages:number
    setActivePage:Dispatch<SetStateAction<number>>
}
const Pagination = ({activePage, totalPages, setActivePage}:PaginationProps) => {
    const {t}=useTranslation()
    return (
        <>
            <Flex gap={"2"} alignItems={"center"}>
                <Flex gap={"2"} maxW={"250px"} my="10">
                    <Button

                        onClick={() => setActivePage(activePage - 1)}
                        isDisabled={activePage === 1}
                    >
                       <ArrowBackIcon/>
                    </Button>
                    <Button
                        onClick={() => setActivePage(activePage + 1)}
                        isDisabled={activePage === totalPages}
                    >
                        <ArrowForwardIcon/>
                    </Button>
                </Flex>
                <Flex gap="1">
                    <Text>{activePage}</Text>
                    <Text> {t("of")}</Text>
                    <Text>{totalPages}</Text>
                </Flex>
            </Flex>
        </>
    )
}
export default Pagination