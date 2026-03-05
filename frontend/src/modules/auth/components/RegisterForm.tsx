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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLoginMutation } from "../hooks";
import { useForm } from "@tanstack/react-form";

import z from "zod";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const userSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    role: z.enum(["PROJECT_MANAGER", "RH"], {
      message: "Please select a role",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { mutate, isPending, isError } = useLoginMutation();

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      role: "" as "PROJECT_MANAGER" | "RH",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      const { confirmPassword, ...payload } = value;
      mutate(payload);
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
      className="border p-10 sm:w-lg z-50 rounded-lg backdrop-blur-sm space-y-4"
    >
      <FieldSet>
        <FieldLegend>Register</FieldLegend>
        <FieldDescription>Create your account.</FieldDescription>
        {isError && (
          <FieldError className="bg-destructive/20 p-2 text-center">
            Something went wrong. Please try again.
          </FieldError>
        )}

        <FieldGroup>
          {/* Username */}
          <form.Field name="username">
            {(field) => (
              <Field>
                <FieldLabel>Username</FieldLabel>
                <Input
                  placeholder="username"
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                )}
              </Field>
            )}
          </form.Field>

          {/* Email */}
          <form.Field name="email">
            {(field) => (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  placeholder="example@example.com"
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                )}
              </Field>
            )}
          </form.Field>

          {/* Role */}
          <form.Field name="role">
            {(field) => (
              <Field>
                <FieldLabel>Role</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(value as "PROJECT_MANAGER" | "RH")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PROJECT_MANAGER">
                      Project Manager
                    </SelectItem>
                    <SelectItem value="RH">RH</SelectItem>
                  </SelectContent>
                </Select>
                {field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                )}
              </Field>
            )}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => (
              <Field>
                <FieldLabel>Password</FieldLabel>
                <div className="flex overflow-hidden items-center">
                  <Input
                    placeholder="**********"
                    type={showPassword ? "text" : "password"}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex-1 text-foreground/50 hover:text-foreground/70 cursor-pointer transition-all p-1.5 border scale-96 bg-foreground/5 text-center"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <EyeIcon className="size-5" />
                    )}
                  </div>
                </div>
                {field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                )}
              </Field>
            )}
          </form.Field>

          {/* Confirm Password */}
          <form.Field name="confirmPassword">
            {(field) => (
              <Field>
                <FieldLabel>Confirm Password</FieldLabel>
                <div className="flex overflow-hidden items-center">
                  <Input
                    placeholder="**********"
                    type={showConfirmPassword ? "text" : "password"}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <div
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="flex-1 text-foreground/50 hover:text-foreground/70 cursor-pointer transition-all p-1.5 border scale-96 bg-foreground/5 text-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <EyeIcon className="size-5" />
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
        Register
        {isPending && <Spinner />}
      </Button>

      <Button variant={"outline"} className="w-full" asChild>
        <Link to={"/login"} className="py-2 text-xs text-foreground/50">
          already have an account? login
        </Link>
      </Button>
    </form>
  );
}
