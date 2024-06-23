import {useParams} from "react-router-dom";
import {
    Box,
    Container,
} from "@chakra-ui/react";

import CastsDetails from "./CastsDetails.tsx";
import VideosDetails from "./VideosDetails.tsx";
import MovieDetails from "./MovieDetails.tsx";

interface RouterParams {
    type: string;
    id: string;
    [key: string]: string | undefined;
}

const Details = () => {

    const {
        type,
        id
    } = useParams<RouterParams>();
    return (
        <Box>
            {(type && id) &&
                <>
                    <MovieDetails type={type} id={id}/>
                    <Container maxW={"container.xl"} pb="10">
                        <CastsDetails type={type} id={id}/>
                        <VideosDetails type={type} id={id}/>
                    </Container>
                </>
            }
        </Box>
    );
};

export default Details;
