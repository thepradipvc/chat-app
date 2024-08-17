import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div
      id="error-page"
      className="grid place-items-center h-svh gap-4 text-center"
    >
      <div className="grid gap-8">
        <h1 className="text-4xl font-bold">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className="text-gray-400">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
