import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useSignIn from "../../hooks/use-sign-in";
import { SchemaSignIn, SigninFormDTO } from "../../schemas/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/use-auth";

export default function SignIn() {
  const navigate = useNavigate();

  const { updateToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormDTO>({
    resolver: zodResolver(SchemaSignIn),
  });
  const [globalError, setGlobalError] = useState<string>();
  const loginUser = useSignIn({
    async onSuccess(data: Response) {
      const body = await data.json();
      if (data.status === 200) {
        updateToken(body.auth_token);
        navigate("/");
        return;
      } else {
        setGlobalError(body.message);
      }
    },
  });

  const onSubmit = (data: SigninFormDTO) => {
    loginUser.mutate(data);
  };

  return (
    <div className="flex flex-col gap-4">
      log in
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="border border-black"
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="border border-black"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
        {globalError && <p>{globalError}</p>}

        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}
