import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MovieType, selectMoviesStatus } from "../../features/moviesSlice";
import checkImg from "../icons/check.png";
import crossImg from "../icons/cross.png";
import { rentMovie } from "../../features/moviesSlice";

type MovieItemProps = {
  movie: MovieType;
};

export const MovieItem = ({ movie }: MovieItemProps) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectMoviesStatus);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(rentMovie(movie.name));
  };

  return (
    <form
      className="grid grid-rows-5 grid-cols-1 sm:grid sm:grid-cols-[repeat(3,2fr)_1fr_100px] sm:grid-rows-1 sm:rounded-full bg-neutral-300 mb-5"
      onSubmit={handleSubmit}
      aria-label="movie-item"
      key={movie.id}
    >
      <span className="text-center sm:text-left m-5">
        <span className="visible sm:hidden font-bold">Name: </span>
        {movie.name}
      </span>
      <span className="text-center sm:text-left m-5">
        <span className="visible sm:hidden font-bold">Genre: </span>
        {movie.genre}
      </span>
      <span className="text-center sm:text-left m-5">
        <span className="visible sm:hidden font-bold">Price: </span>
        {movie.price}
      </span>
      <span className="flex items-center justify-center sm:justify-normal m-5">
        <span className="visible sm:hidden font-bold mr-1">Stock: </span>
        {movie.stock}
        {movie.stock > 0 ? (
          <img className="ml-1 w-5" alt="check" src={checkImg} />
        ) : (
          <img className="ml-1 w-5" alt="check" src={crossImg} />
        )}
      </span>
      <button
        type="submit"
        className="bg-zinc-700 text-white font-bold"
        disabled={status === "loading"}
      >
        Rent
      </button>
    </form>
  );
};