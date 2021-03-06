import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { connect } from "react-redux";
import { authenticate } from "@actions/auth";
import {
  AuthContainer,
  AuthForm,
  FormGroup,
  FormTitle,
  FormLabel,
  FormInput,
  SubmitBtn,
  FormSmall,
} from "@styles/Auth";
import { RequestData } from "@lib/fetch";
import State from "types/State";
import Loader from "@components/loader/Loader";
import Seo from "@components/Seo";

interface Props {
  authenticate: (data: RequestData, login: boolean) => Promise<boolean>;
  loading: boolean;
}

const Register: NextPage<Props> = ({ authenticate, loading }) => {
  const router = useRouter();
  const ref = React.useRef<HTMLInputElement>(null);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  React.useEffect(() => {
    ref.current?.focus();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.prefetch("/app");

    const data = {
      username,
      password,
      password2,
    };
    const success = await authenticate(data, false);

    if (success) {
      return router.push("/app");
    }
  }

  return (
    <>
      <Seo
        description="Authenticate with username and password to gain access to notey.app."
        url="https://notey.caspertheghost.me/auth/register"
        title="Register - notey.app"
      />

      <AuthContainer>
        <AuthForm onSubmit={onSubmit}>
          <FormGroup>
            <FormTitle>Register</FormTitle>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="username">Username</FormLabel>
            <FormInput
              ref={ref}
              autoComplete="username"
              spellCheck={false}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="password"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="password2">Confirm Password</FormLabel>
            <FormInput
              type="password"
              id="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              autoComplete="password"
            />
          </FormGroup>
          <FormGroup>
            <SubmitBtn disabled={loading}>{loading ? <Loader /> : "Sign Up"}</SubmitBtn>
          </FormGroup>
          <FormGroup>
            <FormSmall>
              <Link href="/auth/login">
                <a href="/auth/login">Have an account? Login</a>
              </Link>
            </FormSmall>
          </FormGroup>
        </AuthForm>
      </AuthContainer>
    </>
  );
};

const mapToProps = (state: State) => ({
  loading: state.auth.loading,
});

export default connect(mapToProps, { authenticate })(Register);
