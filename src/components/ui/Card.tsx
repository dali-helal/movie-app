import {Box, Flex, Image, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {imagePath} from "../../services/api/constants.ts";
import {Movie} from "../../services/api/types/Movie.ts";
import {StarIcon} from "@chakra-ui/icons";

interface CardProps {
    item: Movie,
    type:string
}

const Card = ({item,type}: CardProps) => {
    return (
        <Link to={`/${type}/${item?.id}`}>
            <Box
                position={"relative"}
                transform={"scale(1)"}
                _hover={{
                    transform: {base: "scale(1)x", md: "scale(1.08)"},
                    transition: "transform 0.2s ease-in-out",
                    zIndex: "10",
                    "& .overlay": {
                        opacity: 1,
                    },
                }}
            >
                <Image
                    src={`${imagePath}/${item?.poster_path}`}
                    alt={item?.title || item?.name}
                    height={"100%"}
                />
                <Box
                    className="overlay"
                    pos={"absolute"}
                    p="2"
                    bottom={"0"}
                    left={"0"}
                    w={"100%"}
                    h={"35%"}
                    bg="rgba(0,0,0,0.9)"
                    opacity={"0"}
                    transition={"opacity 0.4s ease-in-out"}
                >
                    <Text textAlign={"center"}>{item?.title || item?.name}</Text>
                    <Text textAlign={"center"} fontSize={"x-small"} color={"green.200"}>
                        {new Date(
                            item?.release_date
                        ).getFullYear() || "N/A"}
                    </Text>
                    <Flex alignItems={"center"} justifyContent={"center"} gap={2} mt="4">
                        <StarIcon fontSize={"small"} color={"yellow"}/>
                        <Text>{item?.vote_average?.toFixed(1)}</Text>
                    </Flex>
                </Box>
            </Box>
        </Link>
    );
};

export default Card;