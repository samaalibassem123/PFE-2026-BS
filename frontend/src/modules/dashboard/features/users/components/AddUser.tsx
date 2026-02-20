import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FieldGroup,
  FieldSet,
  Field,
  FieldLabel,
  FieldTitle,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { PenBox } from "lucide-react";

import type { AvailableRoles } from "@/utils/Roles";
import { useCreateUser } from "../hooks/user";
import { useForm } from "@tanstack/react-form";
import z from "zod";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const FormSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, { message: "Username must have at least 3 characters" }),

    email: z.string().email({ message: "Invalid email address" }),

    role: z.string().trim().min(1, { message: "Role is required" }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),

    cpassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords do not match",
    path: ["cpassword"],
  });

export default function AddUser() {
  const { mutate, isPending, isError } = useCreateUser();

  const form = useForm({
    defaultValues: {
      username: "",
      role: "ADMIN",
      email: "",
      password: "",
      cpassword: "",
    },
    validators: {
      onSubmit: FormSchema,
    },
    onSubmit: ({ value }) => {
      const { cpassword, role, ...data } = value;
      const Role = role as AvailableRoles;
      mutate(
        { role: Role, ...data },
        {
          onSuccess: () => {
            toast.success("user Created succesfuly", {
              position: "top-center",
            });
            form.reset();
          },
        },
      );
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PenBox /> Create user
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldSet>
            <FieldTitle className="text-lg">Create new user</FieldTitle>
            {isError && (
              <FieldError className="p-2 text-center text-destructive bg-destructive/20">
                Email is already used before
              </FieldError>
            )}
            <form.Field name="username">
              {(field) => (
                <Field>
                  <FieldLabel>Username : </FieldLabel>
                  <Input
                    placeholder="ex:bob"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <FieldError>
                      {field.state.meta.errors[0]?.message}
                    </FieldError>
                  )}
                </Field>
              )}
            </form.Field>

            <form.Field name="email">
              {(field) => (
                <Field>
                  <FieldLabel>User email : </FieldLabel>
                  <Input
                    placeholder="example@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <FieldError>
                      {field.state.meta.errors[0]?.message}
                    </FieldError>
                  )}
                </Field>
              )}
            </form.Field>

            <form.Field name="role">
              {(field) => (
                <Field>
                  <FieldLabel>Role : </FieldLabel>
                  <Select
                    onValueChange={(value) => {
                      field.handleChange(value);
                    }}
                    defaultValue="ADMIN"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="ADMIN" />
                    </SelectTrigger>
                    <SelectContent align={"end"}>
                      <SelectGroup>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                        <SelectItem value="RH">RH</SelectItem>
                        <SelectItem value="PROJECT_MANAGER">
                          PROJECT MANAGER
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.length > 0 && (
                    <FieldError>
                      {field.state.meta.errors[0]?.message}
                    </FieldError>
                  )}
                </Field>
              )}
            </form.Field>

            <FieldGroup className="flex-row">
              <form.Field name="password">
                {(field) => (
                  <Field>
                    <FieldLabel>Password: </FieldLabel>
                    <Input
                      placeholder="****************"
                      type="password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <FieldError>
                        {field.state.meta.errors[0]?.message}
                      </FieldError>
                    )}
                  </Field>
                )}
              </form.Field>

              <form.Field name="cpassword">
                {(field) => (
                  <Field>
                    <FieldLabel>Confirm Password: </FieldLabel>
                    <Input
                      type="password"
                      placeholder="****************"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors.length > 0 &&
                      field.state.meta.errors.map((f) => (
                        <FieldError key={f?.message}> {f?.message} </FieldError>
                      ))}
                  </Field>
                )}
              </form.Field>
            </FieldGroup>

            <Button type="submit" disabled={isPending}>
              {isPending && <Spinner />}
              Create
            </Button>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
}
