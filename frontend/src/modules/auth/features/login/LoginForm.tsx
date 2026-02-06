import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../hooks";
import { useForm } from "@tanstack/react-form";

import z from "zod";
import { cn } from "@/lib/utils";

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export default function LoginForm() {
  const login = useLoginMutation();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      login.mutate(value);
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
      className="border p-10 w-sm"
    >
      <FieldSet>
        <FieldLegend>Login</FieldLegend>
        <FieldDescription>Login to your space.</FieldDescription>
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
                <Input
                  placeholder=""
                  type="password"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                )}
              </Field>
            )}
          </form.Field>

          <FieldSeparator />
          <Field>
            <Button
              disabled={login.isPending}
              className={cn(login.isPending && "cursor-not-allowed")}
            >
              Login
            </Button>
            <FieldLabel className="text-secondary-foreground/40">
              <Link to="/register" className=" underline cursor-pointer">
                Create an account
              </Link>
            </FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
