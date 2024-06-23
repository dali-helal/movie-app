
interface genres{
    id:number,
    name:string
}
export interface Movie{
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    name?:string
    video: boolean;
    vote_average: number;
    vote_count: number;
    first_air_date:string,
    runtime:number,
    genres:genres[],
    tagline:string
}
export interface TrendingResponse {
    page:number,
    total_pages:number,
    total_results:number
    results:Movie[]
}
export interface MoviesResponse extends TrendingResponse {

}