import {Box, Flex, Heading, Text} from "@chakra-ui/react";
import VideoComponent from "../../components/VideoComponent.tsx";
import {Video, VideosResponse} from "../../services/api/types/Video.ts";
import {useEffect, useState} from "react";

import MovieServiceAPI from "../../services/api/MovieServiceAPI.ts";
import {useTranslation} from "react-i18next";

interface VideosDetailsProps{
    type: string | undefined
    id: string | undefined
}

const VideosDetails=({type,id}:VideosDetailsProps)=>{
    const {t}=useTranslation()
    const [video, setVideo] = useState<Video|undefined>(undefined);
    const [videos, setVideos] = useState<Video[]>([]);
    const movieService = MovieServiceAPI.getInstance();
    useEffect(() => {
        const fetchData = async () => {
            if (!type || !id) return;

            try {
                const videosData = await movieService.fetchVideos<VideosResponse>(type, id)

                const video:Video|undefined = videosData?.results?.find(
                    (video) => video?.type === "Trailer"
                );
                setVideo(video);
                const videos = videosData?.results
                    ?.filter((video) => video?.type !== "Trailer")
                    ?.slice(0, 10);
                setVideos(videos);

            } catch (error) {
                console.log(error, "error");
            }
        };

        fetchData();
    }, [type, id]);

    return(
        <>
            <Heading
                as="h2"
                fontSize={"md"}
                textTransform={"uppercase"}
                mt="10"
                mb="5"
            >
                {t("Videos")}
            </Heading>
            <VideoComponent id={video?.key}/>
            <Flex mt="5" mb="10" overflowX={"scroll"} gap={"5"}>
                {videos &&
                    videos?.map((item) => (
                        <Box key={item?.id} minW={"290px"}>
                            <VideoComponent id={item?.key} small/>
                            <Text fontSize={"sm"} fontWeight={"bold"} mt="2" noOfLines={2}>
                                {item?.name}{" "}
                            </Text>
                        </Box>
                    ))}
            </Flex>
        </>
    )
}
export default VideosDetails