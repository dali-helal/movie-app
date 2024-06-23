import {
    Box,
    Flex,
    Heading,
    IconButton,
    Image,
    Text,
    Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {imagePath} from "../services/api/constants.ts";
import {useFirestore} from "../services/firebase/fire-store.ts";
import {useAuth} from "../context/AuthProvider.tsx";

import {
    CheckIcon,
    StarIcon,
} from "@chakra-ui/icons";
import {WatchList} from "../services/api/types/WatchList.ts";
import {Dispatch, SetStateAction} from "react";


interface WatchlistCardProps{
    type:string,
    item:WatchList,
    setWatchlist:Dispatch<SetStateAction<WatchList[]>>
}
const WatchlistCard = ({ type, item, setWatchlist }:WatchlistCardProps) => {
    const { removeFromWatchlist } = useFirestore();
    const { user } = useAuth();

    const handleRemoveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (user && user.uid && item && item.id) {
            removeFromWatchlist(user.uid, item.id.toString()).then(() => {
                setWatchlist((prev) => prev.filter((el) => el.id !== item.id));
            });
        }
    };
    const releaseYear = () => {
        const releaseDate = item.release_date || item.first_air_date;
        if (releaseDate) {
            return new Date(releaseDate).getFullYear();
        } else {
            return "N/A";
        }
    };
    return (
        <Link to={`/${type}/${item.id}`}>
            <Flex gap="4">
                <Box position={"relative"} w={"150px"}>
                    <Image
                        src={`${imagePath}/${item.poster_path}`}
                        alt={item.title}
                        height={"200px"}
                        minW={"150px"}
                        objectFit={"cover"}
                    />
                    <Tooltip label="Remove from watchlist">
                        <IconButton
                            aria-label="Remove from watchlist"
                            icon={<CheckIcon />}
                            size={"sm"}
                            colorScheme="green"
                            position={"absolute"}
                            zIndex={"999"}
                            top="2px"
                            left={"2px"}
                            onClick={handleRemoveClick}
                        />
                    </Tooltip>
                </Box>

                <Box>
                    <Heading fontSize={{base: 'xl', md: "2xl"}} noOfLines={1}>
                        {item?.title || item?.name}
                    </Heading>
                    <Heading fontSize={"sm"} color={"green.200"} mt="2">
                        {releaseYear()}
                    </Heading>
                    <Flex alignItems={"center"} gap={2} mt="4">
                        <StarIcon fontSize={"small"} />
                        <Text textAlign={"center"} fontSize="small">
                            {item?.vote_average?.toFixed(1)}
                        </Text>
                    </Flex>
                    <Text mt="4" fontSize={{base: "xs", md: "sm"}} noOfLines={5}>
                        {item?.overview}
                    </Text>
                </Box>
            </Flex>
        </Link>
    );
};

export default WatchlistCard;