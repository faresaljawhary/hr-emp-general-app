import React, { useEffect, useState } from "react";
import { Button, Form, Input, Card, Spin, Typography } from "antd";
import {
  LockOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import styles from "./styles.module.scss";
import { serverPath } from "../../helpers/server/const";
import http from "../../shared/http/http";

const {
  signinContainer,
  signinCard,
  logo,
  logoContainer,
  logoText,
  siteFormItemIcon,
  inputField,
  signinBtn,
  customIcon,
} = styles;

const SignInBox = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const handlePasswordChange = (event) => {
    setIsPasswordEmpty(event.target.value === "");
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await http.post(`${serverPath}/authentication/signin`, {
        username: values.email,
        password: values.password,
      });

      const { token, statusCode } = response.data;

      if (statusCode === 200) {
        sessionStorage.setItem("authToken", token);

        window.location.href = "/view-forms";
      } else {
        const errorMessage = response?.data?.message || "An error occurred";
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      }
    } catch (error) {
      if (error.response.status === 403) {
        toast.error(
          "You do not have access to this system. Please enter HR account.",
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      } else {
        toast.error("Authentication failed. Please check your credentials.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={signinContainer}>
      <Card title="Sign in" className={signinCard}>
        <div className={logoContainer}>
          <img
            src="/assets/images/npc_logo.png"
            alt="NPC Logo"
            className={logo}
          />
          <Typography.Title level={4} className={logoText}>
            HR General Employment
          </Typography.Title>
        </div>

        <Form form={form} name="horizontal_signin" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className={siteFormItemIcon} />}
              placeholder="username"
              className={inputField}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className={siteFormItemIcon} />}
              placeholder="Password"
              iconRender={(visible) =>
                !loading && !isPasswordEmpty ? (
                  visible ? (
                    <EyeTwoTone twoToneColor="#F4D03F" />
                  ) : (
                    <EyeInvisibleOutlined className={customIcon} />
                  )
                ) : null
              }
              className={inputField}
              onChange={handlePasswordChange}
            />
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={loading ? <Spin /> : null}
                disabled={
                  !clientReady ||
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
                className={signinBtn}
              >
                Log in
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default SignInBox;
