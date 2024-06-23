import ServiceApi from "./MainServiceAPI.ts";


class MovieService {
    private static instance: MovieService;
    private apiKey = import.meta.env.VITE_API_KEY;

    // Method to get the singleton instance
    public static getInstance(): MovieService {
        if (!MovieService.instance) {
            MovieService.instance = new MovieService();
        }
        return MovieService.instance;
    }

    public async fetchTrending<TData>(timeWindow = "day") {
        try {

            const response = await ServiceApi
                .getInstance()
                .invoke<TData>(
                    {
                        method: 'GET',
                        endPoint: "/trending/all/:timeWindow",
                        pathParams: {timeWindow: timeWindow},
                        queryParams: {api_key: this.apiKey},
                        secure: false
                    });
            return response;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    public async fetchDetails<TData>(type: string, id: string) {
        try {

            const response = await ServiceApi
                .getInstance()
                .invoke<TData>(
                    {
                        method: 'GET',
                        endPoint: "/:type/:id",
                        pathParams: {type: type, id: id},
                        queryParams: {api_key: this.apiKey},
                        secure: false
                    });
            return response;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    public async fetchCredits<TData>(type: string, id: string) {
        try {

            const response = await ServiceApi
                .getInstance()
                .invoke<TData>(
                    {
                        method: 'GET',
                        endPoint: "/:type/:id/credits",
                        pathParams: {type: type, id: id},
                        queryParams: {api_key: this.apiKey},
                        secure: false
                    });
            return response;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    public async fetchVideos<TData>(type: string, id: string) {
        try {

            const response = await ServiceApi
                .getInstance()
                .invoke<TData>(
                    {
                        method: 'GET',
                        endPoint: "/:type/:id/videos",
                        pathParams: {type: type, id: id},
                        queryParams: {api_key: this.apiKey},
                        secure: false
                    });
            return response;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    public async fetchMovies<TData>(pageNumber: number, sortBy: string) {
        try {

            const response = await ServiceApi
                .getInstance()
                .invoke<TData>(
                    {
                        method: 'GET',
                        endPoint: "/discover/movie",
                        queryParams: {
                            api_key: this.apiKey,
                            page: pageNumber,
                            sort_by: sortBy
                        },
                        secure: false
                    });
            return response;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
    public async fetchSeries<TData>(pageNumber: number, sortBy: string) {
        try {

            const response = await ServiceApi
                .getInstance()
                .invoke<TData>(
                    {
                        method: 'GET',
                        endPoint: "/discover/tv",
                        queryParams: {
                            api_key: this.apiKey,
                            page: pageNumber,
                            sort_by: sortBy
                        },
                        secure: false
                    });
            return response;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
    public async searchData<TData>(query:string, page:number) {
        try {

            const response = await ServiceApi
                .getInstance()
                .invoke<TData>(
                    {
                        method: 'GET',
                        endPoint: "/search/multi",
                        queryParams: {
                            api_key: this.apiKey,
                            query: query,
                            page: page
                        },
                        secure: false
                    });
            return response;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}

export default MovieService;