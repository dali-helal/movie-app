import {Box, Flex, Heading, Image, Text} from "@chakra-ui/react";
import {imagePath} from "../../services/api/constants.ts";
import {CastMember, CastResponse} from "../../services/api/types/Cast.ts";
import MovieServiceAPI from "../../services/api/MovieServiceAPI.ts";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";



interface VideosDetailsProps{
    type: string | undefined
    id: string | undefined
}
const CastsDetails=({type,id}:VideosDetailsProps)=>{
    const {t}=useTranslation()
    const movieService = MovieServiceAPI.getInstance();
    const [cast, setCast] = useState<CastMember[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!type || !id) return;

            try {
                const creditsData =await movieService.fetchCredits<CastResponse>(type, id)

                setCast(creditsData?.cast?.slice(0, 10))

            } catch (error) {
                console.log(error, "error");
            }
        };

        fetchData();
    }, [type, id])

    return(
        <>
            <Heading as="h2" fontSize={"md"} textTransform={"uppercase"} mt="10">
                {t("Cast")}
            </Heading>
            <Flex mt="5" mb="10" overflowX={"scroll"} gap={"5"}>
                {cast?.length === 0 && <Text>No cast found</Text>}
                {cast &&
                    cast?.map((item) => (
                        <Box key={item?.id} minW={"150px"}>
                            <Image
                                src={`${imagePath}/${item?.profile_path}`}
                                w={"100%"}
                                height={"225px"}
                                objectFit={"cover"}
                                borderRadius={"sm"}
                            />
                        </Box>
                    ))}
            </Flex>
        </>
    )
}
export default CastsDetails