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
                    const data= await getWatchlist(user.uid);
                    setWatchlist(data);
                    console.log(data, "data");
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