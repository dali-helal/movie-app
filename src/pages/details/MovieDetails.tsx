import {imagePath, imagePathOriginal} from "../../services/api/constants.ts";
import {
    Badge,
    Box, Button,
    CircularProgress,
    CircularProgressLabel,
    Container,
    Flex,
    HStack,
    Image, Spinner,
    Text, useToast
} from "@chakra-ui/react";
import {CalendarIcon, CheckCircleIcon, SmallAddIcon, TimeIcon} from "@chakra-ui/icons";
import {minutesTohours, ratingToPercentage, resolveRatingColor} from "../../utils/helpers.ts";
import MovieServiceAPI from "../../services/api/MovieServiceAPI.ts";

import {useEffect, useState} from "react";
import {Movie} from "../../services/api/types/Movie.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../context/AuthProvider.tsx";
import {WatchList} from "../../services/api/types/WatchList.ts";
import {useFirestore} from "../../services/firebase/fire-store.ts";


interface MovieDetailsProps{
    type: string | undefined
    id: string | undefined
}

const MovieDetails=({type,id}:MovieDetailsProps)=>{
    const {t}=useTranslation()
    const {addToWatchlist,checkIfInWatchlist,removeFromWatchlist}=useFirestore()
    const toast=useToast()
    const {user}=useAuth()

    const movieService = MovieServiceAPI.getInstance();

    const [details, setDetails] = useState<Movie>();
    const [loading, setLoading] = useState(true);
    const [isInWatchlist, setIsInWatchlist] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
            if (!type || !id) return;

            try {
                const detailsData = await movieService.fetchDetails<Movie>(type, id)

                setDetails(detailsData);

            } catch (error) {
                console.log(error, "error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type, id]);



    useEffect(() => {
        if (!user || !id) {
            setIsInWatchlist(false);
            return;
        }

        checkIfInWatchlist(user?.uid, id).then((data) => {
            setIsInWatchlist(data);
        });
    }, [id, user, checkIfInWatchlist]);

    if (loading || !details) {
        return (
            <Flex justify={"center"}>
                <Spinner size={"xl"} color="red"/>
            </Flex>
        );
    }

    const handleRemoveFromWatchlist = async () => {
        if(user && id){
            await removeFromWatchlist(user?.uid, id);
            const isSetToWatchlist = await checkIfInWatchlist(user?.uid, id);
            setIsInWatchlist(isSetToWatchlist);
        }
    };

    const handleSaveToWatchlist = async () => {
        if (!user) {
            toast({
                title: "Login to add to watchlist",
                status: "error",
                isClosable: true,
                position:'top',
                duration:5000,
            });
            return;
        }
      const data:WatchList={
          id: details?.id,
          title: details?.title || details?.name,
          type: type,
          poster_path: details?.poster_path,
          release_date: details?.release_date || details?.first_air_date,
          vote_average: details?.vote_average,
          overview: details?.overview,
      }
        const dataId = details?.id?.toString();
        await addToWatchlist(user?.uid, dataId, data);
        const isSetToWatchlist = await checkIfInWatchlist(user?.uid, dataId);
        setIsInWatchlist(isSetToWatchlist);
    };


    const title = details.title || details.name;
    const releaseDate =
        type === "tv" ? details.first_air_date : details.release_date;

    return(
        <>
            <Box
                background={`linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)), url(${imagePathOriginal}/${details?.backdrop_path})`}
                backgroundRepeat={"no-repeat"}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                w={"100%"}
                h={{ base: "auto", md: "500px" }}
                py={"2"}
                zIndex={"-1"}
                display={"flex"}
                alignItems={"center"}
            >
                <Container maxW={"container.xl"}>
                    <Flex
                        alignItems={"center"}
                        gap="10"
                        flexDirection={{ base: "column", md: "row" }}
                    >
                        <Image
                            height={"450px"}
                            borderRadius={"sm"}
                            src={`${imagePath}/${details?.poster_path}`}
                        />
                        <Box>
                            <HStack fontSize={"3xl"}>
                                <Text>{title}{" "}</Text>
                                <Text as="span" fontWeight={"normal"} color={"gray.400"}>
                                    {new Date(releaseDate).getFullYear()}
                                </Text>
                            </HStack>

                            <Flex alignItems={"center"} gap={"4"} mt={1} mb={5}>
                                <Flex alignItems={"center"}>
                                    <CalendarIcon mr={2} color={"gray.400"} />
                                    <Text fontSize={"sm"}>
                                        {new Date(releaseDate).toLocaleDateString("en-US")} (US)
                                    </Text>
                                </Flex>
                                {type === "movie" && (
                                    <>
                                        <Box>*</Box>
                                        <Flex alignItems={"center"}>
                                            <TimeIcon mr="2" color={"gray.400"} />
                                            <Text fontSize={"sm"}>
                                                {minutesTohours(details?.runtime)}
                                            </Text>
                                        </Flex>
                                    </>
                                )}
                            </Flex>
                            <Flex alignItems={"center"} gap={"4"}>
                                <CircularProgress
                                    value={ratingToPercentage(details?.vote_average)}
                                    bg={"gray.800"}
                                    borderRadius={"full"}
                                    p={"0.5"}
                                    size={"70px"}
                                    color={resolveRatingColor(details?.vote_average)}
                                    thickness={"6px"}
                                >
                                    <CircularProgressLabel fontSize={"lg"} color={"white"}>
                                        {ratingToPercentage(details?.vote_average)}{" "}
                                        <Box as="span" fontSize={"10px"}>
                                            %
                                        </Box>
                                    </CircularProgressLabel>
                                </CircularProgress>
                                <Text display={{ base: "none", md: "initial" }}>
                                    User Score
                                </Text>
                                {isInWatchlist ? (
                                    <Button
                                        leftIcon={<CheckCircleIcon />}
                                        colorScheme="green"
                                        variant={"outline"}
                                        color={"white"}
                                        onClick={handleRemoveFromWatchlist}
                                    >
                                        {t("In watchlist")}
                                    </Button>
                                ) : (
                                    <Button
                                        leftIcon={<SmallAddIcon />}
                                        variant={"outline"}
                                        color={"white"}
                                        onClick={handleSaveToWatchlist}
                                    >
                                        {t("Add to watchlist")}
                                    </Button>
                                )}
                            </Flex>
                            <Text
                                color={"gray.400"}
                                fontSize={"sm"}
                                fontStyle={"italic"}
                                my="5"
                            >
                                {details?.tagline}
                            </Text>
                            <Text fontSize={"xl"} mb={"3"}>
                                {t("Overview")}
                            </Text>
                            <Text fontSize={"md"} mb={"3"}>
                                {details?.overview}
                            </Text>
                            <Flex mt="6" gap="2">
                                {details?.genres?.map((genre) => (
                                    <Badge key={genre?.id} p="1">
                                        {genre?.name}
                                    </Badge>
                                ))}
                            </Flex>
                        </Box>
                    </Flex>
                </Container>
            </Box>
        </>
    )
}
export default MovieDetails