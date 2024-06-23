import {
    Container,
    Flex,
    Grid,
    Heading,
    Select,
    Skeleton,
} from "@chakra-ui/react";
import MovieServiceAPI from "../../services/api/MovieServiceAPI.ts";
import {useEffect, useState} from "react";
import {Movie, MoviesResponse} from "../../services/api/types/Movie.ts";
import Card from "../../components/ui/Card.tsx";
import Pagination from "../../components/Pagination.tsx";


const Shows = () => {
    const movieService = MovieServiceAPI.getInstance();

    const [shows, setMovies] = useState<Movie[]>([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState("popularity.desc");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSeries = async () => {
            setIsLoading(true)
            try {
                const response = await movieService.fetchSeries<MoviesResponse>(activePage, sortBy);
                setMovies(response.results);
                setActivePage(response.page);
                setTotalPages(response.total_pages);
            } catch (error) {
                console.error("Error fetching shows:", error);
            } finally {
                setIsLoading(false)
            }

        };

        fetchSeries();

    }, [activePage, sortBy]);

    return (
        <>
            <Container maxW={"container.xl"}>
                <Flex
                    direction={{base: "column", md: "row"}}
                    alignItems={"baseline"}
                    gap={"4"} my="10"
                >
                    <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
                        Discover TV Shows
                    </Heading>

                    <Select
                        w={"130px"}
                        onChange={(e) => {
                            setActivePage(1);
                            setSortBy(e.target.value);
                        }}
                    >
                        <option value="popularity.desc">Popular</option>
                        <option value="vote_average.desc&vote_count.gte=1000">
                            Top Rated
                        </option>
                    </Select>
                    <Pagination
                        activePage={activePage}
                        totalPages={totalPages}
                        setActivePage={setActivePage}
                    />
                </Flex>

                <Grid
                    templateColumns={{
                        base: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(4, 1fr)",
                        lg: "repeat(5, 1fr)",
                    }}
                    gap={"4"}
                >
                    {shows &&
                        shows?.map((item, i) =>
                            isLoading ? (
                                <Skeleton height={300} key={i}/>
                            ) : (
                                <Card key={item?.id} item={item} type={"tv"}/>
                            )
                        )}
                </Grid>

            </Container>
        </>
    )
}
export default Shows