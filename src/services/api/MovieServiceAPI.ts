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
                        pathParams: { timeWindow: timeWindow },
                        queryParams:{api_key:this.apiKey},
                        secure:false
                    });
            return response;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}

export default MovieService;