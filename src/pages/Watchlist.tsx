import { useState, useEffect } from "react";

import { Container, Flex, Grid, Heading, Spinner } from "@chakra-ui/react";
import WatchlistCard from "../components/WatchlistCard";
import {WatchList} from "../services/api/types/WatchList.ts";
import {useFirestore} from "../services/firebase/fire-store.ts";
import {useAuth} from "../context/AuthProvider.tsx";

const Watchlist = () => {
    const { getWatchlist } = useFirestore();
    const { user } = useAuth();
    const [watchlist, setWatchlist] = useState<WatchList[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchWatchlist = async () => {
            if (user?.uid) {
                try {
                    const data = await getWatchlist(user.uid);
                    const transformedData: WatchList[] = data.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        name: item.name,
                        type: item.type,
                        poster_path: item.poster_path,
                        release_date: item.release_date,
                        vote_average: item.vote_average,
                        overview: item.overview,
                        first_air_date: item.first_air_date,
                    }));
                    setWatchlist(transformedData);
                    console.log(transformedData, "transformed data");
                } catch (err) {
                    console.error(err, "error");
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchWatchlist();
    }, [user?.uid, getWatchlist]);

    return (
        <Container maxW={"container.xl"}>
            <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
                <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
                    Watchlist
                </Heading>
            </Flex>
            {isLoading && (
                <Flex justify={"center"} mt="10">
                    <Spinner size={"xl"} color="red" />
                </Flex>
            )}
            {!isLoading && watchlist?.length === 0 && (
                <Flex justify={"center"} mt="10">
                    <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
                        Watchlist is empty
                    </Heading>
                </Flex>
            )}
            {!isLoading && watchlist?.length > 0 && (
                <Grid
                    templateColumns={{
                        base: "1fr",
                    }}
                    gap={"4"}
                >
                    {watchlist?.map((item) => (
                        <WatchlistCard
                            key={item?.id}
                            item={item}
                            type={item.type}
                            setWatchlist={setWatchlist}
                        />
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default Watchlist;