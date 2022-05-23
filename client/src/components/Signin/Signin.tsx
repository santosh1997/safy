import { Button, Card, Col, Input, Row, Spin } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Encryptor from "../../crosscutting/encryptor/encryptor";
import ServiceConsumer from "../../crosscutting/serviceconsumer/serviceConsumer";
import {
  AuthType,
  ContentType,
  RequestType,
} from "../../crosscutting/serviceconsumer/serviceConsumer.type";
import { AUTH_TOKEN_STORAGE_KEY } from "../Route/PrivateRoute/PrivateRoute.constant";
import { SignInFieldRow } from "./Signin.style";

type SignInFieldKey = "email" | "password";

const Signin = (): JSX.Element => {
  const history = useHistory();
  const [signInFormState, setSignInFormState] = useState({
    isLoading: false,
    fields: {
      email: {
        value: "",
        isError: false,
      },
      password: {
        value: "",
        isError: false,
      },
    },
  });

  const onInputChange = (value: string, key: SignInFieldKey) => {
    setSignInFormState({
      isLoading: false,
      fields: {
        ...signInFormState.fields,
        [key]: { value: value, isError: false },
      },
    });
  };

  const setError = (key: SignInFieldKey) => {
    setSignInFormState({
      isLoading: false,
      fields: {
        ...signInFormState.fields,
        [key]: { ...signInFormState.fields[key], isError: true },
      },
    });
  };

  const onSignIn = async () => {
    if (!signInFormState.fields.email.value) setError("email");
    else if (!signInFormState.fields.password.value) setError("password");
    else {
      setSignInFormState({ ...signInFormState, isLoading: true });
      const payload = {
        email: signInFormState.fields.email.value,
        password: signInFormState.fields.password.value,
      };
      const encryptedPayload = Encryptor.encrypt(JSON.stringify(payload));
      const tokenComposite = await ServiceConsumer.callJSONService<{
        token: string;
      }>({
        type: RequestType.POST,
        relativeURL: "/auth/safesignin",
        content: ContentType.JSON,
        authType: AuthType.PUBLIC,
        data: { payload: encryptedPayload },
      });
      if (tokenComposite?.token) {
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, tokenComposite.token);
        history.push("/");
      } else {
        setSignInFormState({
          ...signInFormState,
          isLoading: false,
        });
      }
    }
  };

  return (
    <Row>
      <Col span={8}></Col>
      <Col span={8}>
        <Spin spinning={signInFormState.isLoading} delay={200}>
          <Card title="Signin">
            <SignInFieldRow>
              <Input
                placeholder="Email"
                status={signInFormState.fields.email.isError ? "error" : ""}
                onChange={(e) => onInputChange(e.target.value, "email")}
              />
            </SignInFieldRow>
            <SignInFieldRow>
              <Input.Password
                placeholder="Password"
                status={signInFormState.fields.password.isError ? "error" : ""}
                onChange={(e) => onInputChange(e.target.value, "password")}
              />
            </SignInFieldRow>
            <Button type="primary" onClick={onSignIn}>
              Signin
            </Button>
          </Card>
        </Spin>
      </Col>
      <Col span={8}></Col>
    </Row>
  );
};

export default Signin;
