import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SchemaSignUp, SignupFormDTO } from "../../schemas/auth";
import useSignUp from "../../hooks/use-sign-up";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();
  const [globalError, setGlobalError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormDTO>({
    resolver: zodResolver(SchemaSignUp),
  });
  const createUser = useSignUp({
    async onSuccess(data: Response) {
      const body = await data.json();
      if (data.status === 201) {
        navigate("/auth/sign-in");
        return;
      } else if (data.status === 400) {
        switch (body.code) {
          case "weak_password":
            setError("password", { message: body.message });
            return;
          case "user_already_exists":
            setError("email", { message: body.message });
            return;
          default:
            setGlobalError(body.message);
            return;
        }
      }
    },
  });

  const onSubmit = (data: SignupFormDTO) => {
    setGlobalError(undefined);
    createUser.mutate(data);
  };

  return (
    <div className="flex flex-col gap-4">
      Create a new user
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

        {globalError && <p>There was a problem, please try later</p>}
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
