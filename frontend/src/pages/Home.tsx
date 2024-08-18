import { registerAction, usernameAvailability } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { CircleAlert, CircleCheck, Loader } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

const Home = () => {
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState("");

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerAction,
    onSuccess: () => {
      navigate("/chat");
    },
  });

  const checkAvailability = useDebouncedCallback(async (username: string) => {
    if (username.length < 3) return;

    const {
      data: { available },
    } = await usernameAvailability(username);

    if (available) {
      setUsernameAvailable(`'${username}' is available`);
    } else {
      setUsernameError(`'${username}' is already taken`);
    }
  }, 300);

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(registerInfo);
  };

  return (
    <main className="grid h-full p-10 lg:grid-cols-2">
      <div className="my-auto font-baloobhai">
        <h1 className="w-full text-balance text-center text-4xl font-bold md:text-5xl lg:text-left lg:text-6xl">
          Welcome to the <br /> awesome ChatApp
        </h1>
        <form onSubmit={register}>
          <input
            type="text"
            placeholder="Claim your username"
            value={registerInfo.username}
            onChange={(e) => {
              setRegisterInfo({ ...registerInfo, username: e.target.value });
              setUsernameAvailable("");
              setUsernameError("");
              if (e.target.value.length < 3) {
                setUsernameError("Username must be at least 3 characters long");
              }
              checkAvailability(e.target.value);
            }}
            className="mt-6 w-3/5 border-b border-primary px-2 py-1 text-4xl outline-none focus-within:rounded-md focus-within:bg-slate-100"
          />

          <span
            className={cn("invisible ml-2 flex items-center text-destructive", {
              visible: usernameError !== "",
            })}
          >
            {usernameError !== "" && (
              <CircleAlert className="mr-1 inline-block h-4 w-4" />
            )}

            {usernameError}
          </span>
          <span
            className={cn("invisible ml-2 flex items-center text-green-600", {
              visible: usernameAvailable !== "",
            })}
          >
            {usernameAvailable !== "" && (
              <CircleCheck className="mr-1 inline-block h-4 w-4" />
            )}
            {usernameAvailable}
          </span>
          <div
            className={cn("mt-8", {
              hidden: usernameAvailable === "",
            })}
          >
            <span className="ml-2 block text-2xl">Let's secure it</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={registerInfo.password}
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, password: e.target.value })
              }
              className="block w-3/5 border-b border-primary px-2 py-1 text-2xl outline-none focus-within:rounded-md focus-within:bg-slate-100"
            />
          </div>
          <Button className="mt-4 text-lg">
            {mutation.isPending && (
              <Loader className="mr-2 h-5 w-5 animate-spin" />
            )}
            Continue to app
          </Button>
        </form>
        <p className="mt-2">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary underline underline-offset-2"
          >
            Login
          </Link>
        </p>
      </div>
      <div className="hidden h-full lg:block">
        <img src="/hero-img.png" alt="Hero image" />
      </div>
    </main>
  );
};

export default Home;
