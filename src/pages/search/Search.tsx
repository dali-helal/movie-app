import {Container, Heading, Flex, Input, Spinner, Grid, Skeleton} from "@chakra-ui/react";
import {useState,useEffect} from "react";
import Pagination from "../../components/Pagination.tsx";
import MovieServiceAPI from "../../services/api/MovieServiceAPI.ts";
import {Movie, TrendingResponse} from "../../services/api/types/Movie.ts";
import Card from "../../components/ui/Card.tsx";


const Search=()=>{
    const movieService = MovieServiceAPI.getInstance();

    const [searchValue, setSearchValue] = useState("");
    const [tempSearchValue, setTempSearchValue] = useState("");
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Movie[]>([]);

    useEffect(() => {
        setIsLoading(true);
        movieService.searchData<TrendingResponse>(searchValue, activePage)
            .then((res) => {
                setData(res?.results);
                setActivePage(res?.page);
                setTotalPages(res?.total_pages);
            })
            .catch((err) => console.log(err, "err"))
            .finally(() => setIsLoading(false));
    }, [searchValue, activePage]);

    const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchValue(tempSearchValue);
    };
    return(
        <>
            <Container maxW={"container.xl"}>
                <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
                    <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
                        Search
                    </Heading>
                </Flex>

                <form onSubmit={handleSearch}>
                    <Input
                        placeholder="Search movies, tv shows..."
                        _placeholder={{ color: "gray.100" }}
                        value={tempSearchValue}
                        onChange={(e) => setTempSearchValue(e.target.value)}
                    />
                </form>
                {data?.length > 0 && !isLoading && (
                    <Pagination
                        activePage={activePage}
                        totalPages={totalPages}
                        setActivePage={setActivePage}
                    />
                )}
                {isLoading && (
                    <Flex justifyContent={"center"} mt="10">
                        <Spinner size={"xl"} color="red" />
                    </Flex>
                )}

                {data?.length === 0 && !isLoading && (
                    <Heading textAlign={"center"} as="h3" fontSize={"sm"} mt="10">
                        No results found
                    </Heading>
                )}

                <Grid
                    templateColumns={{
                        base: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(4, 1fr)",
                        lg: "repeat(5, 1fr)",
                    }}
                    gap={"4"}
                    mt="6"
                >
                    {data?.length > 0 &&
                        !isLoading &&
                        data?.map((item, i) =>
                            isLoading ? (
                                <Skeleton height={300} key={i} />
                            ) : (
                                <Card
                                    key={item?.id}
                                    item={item}
                                    type={item?.media_type}
                                />
                            )
                        )}
                </Grid>

            </Container>
        </>
    )
}
export default Search