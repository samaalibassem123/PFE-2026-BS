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

export default function LoginForm() {
  return (
    <form action="" className="border p-10 w-sm">
      <FieldSet>
        <FieldLegend>Login</FieldLegend>
        <FieldDescription>Login to your space.</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input placeholder="example@example.com" type="email" />
            <FieldError>Mail Not Found</FieldError>
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input placeholder="" type="password" />
            <FieldError>Password Incorrect</FieldError>
          </Field>
          <FieldSeparator />
          <Field>
            <Button>Login</Button>
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
