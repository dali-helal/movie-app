import {Box, Container, Flex, Grid, Heading, Skeleton, useColorMode} from "@chakra-ui/react";
import {useEffect, useState} from "react";

import Card from "../components/ui/Card.tsx";

import {Movie, TrendingResponse} from "../services/api/types/Movie.ts"
import MovieServiceAPI from "../services/api/MovieServiceAPI.ts";
import {useTranslation} from "react-i18next";


const HomeScreen = () => {
    const {t} = useTranslation()
    const {colorMode} = useColorMode()
    const [data, setData] = useState<Movie[]>([])
    const [timeWindow, setTimeWindow] = useState("day");
    const [loading, setLoading] = useState(true);

    const movieService = MovieServiceAPI.getInstance();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await movieService.fetchTrending<TrendingResponse>(timeWindow);
                setData(response.results);
                setLoading(false);
            } catch (err) {
                console.log(err, "err");
                setLoading(false);
            }
        };
        fetchData();

    }, [timeWindow]);

    return (
        <Container maxW={"container.xl"}>
            <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
                <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
                    {t("Trending")}
                </Heading>
                <Flex
                    alignItems={"center"}
                    gap={"2"}
                    border={"1px solid teal"}
                    borderRadius={"20px"}
                >
                    <Box
                        as="button"
                        px="3"
                        py="1"
                        fontSize={{
                            base:"12px",
                            md:"1xl"
                        }}
                        borderRadius={"20px"}
                        bg={`${timeWindow === "day" ? colorMode == 'dark' ? "gray.800" : "gray.300" : ""}`}
                        onClick={() => setTimeWindow("day")}
                    >
                        {t("Today")}
                    </Box>
                    <Box
                        as="button"
                        px="3"
                        py="1"
                        fontSize={{
                            base:"12px",
                            md:"1xl"
                        }}
                        borderRadius={"20px"}
                        bg={`${timeWindow === "week" ? colorMode == 'dark' ? "gray.800" : "gray.300" : ""}`}
                        onClick={() => setTimeWindow("week")}
                    >
                        {t("This Week")}
                    </Box>
                </Flex>
            </Flex>

            <Grid
                templateColumns={{
                    base: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(4, 1fr)",
                    lg: "repeat(5, 1fr)",
                }}
                gap={4}
            >
                {data && data.map((item, index) => (
                    loading ? (
                        <Skeleton height={300} key={index}/>
                    ) : (
                        <Card key={index}
                              item={item}
                              type={item.media_type}
                        />
                    )
                ))}
            </Grid>
        </Container>
    );
};

export default HomeScreen;