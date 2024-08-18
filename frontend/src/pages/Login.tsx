import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const errorElementRef = useRef<HTMLSpanElement>(null);

  const mutation = useMutation({
    mutationFn: loginAction,
    onSuccess: () => {
      navigate("/chat");
    },
    onError: (error) => {
      errorElementRef.current!.textContent =
        // @ts-expect-error - type error in axios
        error.response.data.message;
      errorElementRef.current!.classList.remove("invisible");
    },
  });

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(loginInfo);
  };

  return (
    <main className="grid h-full p-10">
      <div className="mx-auto my-auto w-1/2 min-w-96 font-baloobhai">
        <h1 className="w-full text-balance text-center text-4xl font-bold md:text-5xl lg:text-left lg:text-6xl">
          Log in to your chat app
        </h1>
        <span
          ref={errorElementRef}
          className="invisible mt-4 block text-destructive"
        ></span>
        <form onSubmit={login}>
          <input
            type="text"
            placeholder="Enter your username"
            value={loginInfo.username}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, username: e.target.value })
            }
            className="mt-6 w-1/2 border-b border-primary px-2 py-1 text-2xl outline-none"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={loginInfo.password}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
            className="mt-6 block w-1/2 border-b border-primary px-2 py-1 text-2xl outline-none"
          />
          <Button disabled={mutation.isPending} className="mt-4 text-lg">
            {mutation.isPending && (
              <Loader className="mr-2 h-5 w-5 animate-spin" />
            )}
            Continue to app
          </Button>
        </form>
        <p className="mt-4">
          New here?{" "}
          <Link to="/" className="text-primary underline underline-offset-2">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
