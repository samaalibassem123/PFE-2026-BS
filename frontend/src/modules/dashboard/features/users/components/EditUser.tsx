import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PenBoxIcon } from "lucide-react";
import type { UserData } from "../type";
import {
  Field,
  FieldLabel,
  FieldSet,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import z from "zod";
import { useUpdateUser } from "../hooks/user";
import type { AvailableRoles } from "@/utils/Roles";
import { Spinner } from "@/components/ui/spinner";

const FormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must have at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.string().trim().min(1, { message: "Role is required" }),
});

interface Props {
  user: UserData;
}

export default function EditUser({ user }: Props) {
  const { mutate, isError, isPending } = useUpdateUser();

  const form = useForm({
    defaultValues: {
      username: user.username as string,
      email: user.email as string,
      role: user.role as string,
    },
    validators: {
      onSubmit: FormSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
      const { role, ...data } = value;
      mutate({
        user_id: user.id as string,
        new_user_data: { role: role as AvailableRoles, ...data },
      });
    },
  });
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button className="justify-between w-full text-white" variant={"link"}>
          Edit <PenBoxIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit {user.username}</DrawerTitle>
          <DrawerDescription>by the mail {user.email}.</DrawerDescription>
        </DrawerHeader>
        <form
          className="p-5 h-full"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldSet className=" h-full flex flex-col justify-between">
            <FieldGroup>
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
                      defaultValue={user.role}
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
            </FieldGroup>

            <FieldGroup className=" float-end">
              <Button disabled={isPending} variant={"secondary"} type="submit">
                {isPending && <Spinner />} Update
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </FieldGroup>
          </FieldSet>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
