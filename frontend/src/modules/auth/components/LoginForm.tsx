import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "../hooks";
import { useForm } from "@tanstack/react-form";

import z from "zod";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export default function LoginForm() {
  const [password, setshowPassword] = useState<boolean>(false);
  const { mutate, isPending, isError } = useLoginMutation();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      mutate(value);
    },
    validators: {
      onSubmit: userSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="border p-10 w-sm z-50 bg-black space-y-4"
    >
      <FieldSet>
        <FieldLegend>Login</FieldLegend>
        <FieldDescription>Login to your space.</FieldDescription>
        {isError && (
          <FieldError className="bg-destructive/20 p-2 text-center">
            Email or password incorrect
          </FieldError>
        )}

        <FieldGroup>
          <form.Field name="email">
            {(field) => (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  placeholder="example@example.com"
                  type="email"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                )}
              </Field>
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <Field>
                <FieldLabel>Password</FieldLabel>
                <div className="flex  overflow-hidden items-center">
                  <Input
                    placeholder="**********"
                    type={!password ? "password" : "text"}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <div
                    onClick={() => setshowPassword(!password)}
                    className="flex-1 text-foreground/50 hover:text-foreground/70 cursor-pointer transition-all  p-1.5 border scale-96  bg-foreground/5 text-center "
                  >
                    {!password ? (
                      <EyeOff className=" size-5 " />
                    ) : (
                      <EyeIcon className=" size-5 " />
                    )}
                  </div>
                </div>

                {field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                )}
              </Field>
            )}
          </form.Field>
        </FieldGroup>
      </FieldSet>
      <Separator />
      <Button
        disabled={isPending}
        className={cn(isPending && "cursor-not-allowed", "w-full")}
      >
        Login
        {isPending && <Spinner />}
      </Button>
    </form>
  );
}
