import React, { useState } from "react";
import { Formik } from "formik";
import LoginFormSchema from "../validations/Loginform.validations";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Input, Button } from "antd";
import FullPageLoader from "../components/loader";

// Services
import { userLogin } from "../services/user.services";

const LoginForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginFormSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({
        values,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className="auth_form">
          <Input
            type="email"
            onChange={handleChange}
            name="email"
            onBlur={handleBlur}
            touched={touched}
            value={values.email}
            placeholder="Your Email"
            className="auth_input"
          />
          {errors.email && touched.email ? (
            <div className="text-danger">{errors.email}</div>
          ) : null}

          <Input
            type="password"
            name="password"
            placeholder="Your password"
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched}
            value={values.password}
            className="auth_input"
          />
          {errors.password && touched.password ? (
            <div className="text-danger">{errors.password}</div>
          ) : null}

          <Button type="primary" className="auth_btn" htmlType="submit">
            Login
          </Button>
        </form>
      )}
    </Formik>
  );
};

const Login = ({ userLogin, history }) => {
  const [isLoading, setIsLoading] = useState(false);

  const login = (data) =>
    new Promise((resolve, reject) => {
      userLogin(data, resolve, reject);
    });

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      await login(values);
      setTimeout(() => {
        setIsLoading(false);
        history.replace("/");
      }, 300);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  if (isLoading) return <FullPageLoader />;

  return (
    <div className="auth_form_container">
      <div className="auth_form_wrapper">
        <LoginForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      userLogin,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
