import React, { useState } from "react";
import { Formik } from "formik";
import {
  SingupFormUserSchema,
  SingupFormEmpSchema,
} from "../validations/Signupform.validations";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Input, Button, Radio, Select } from "antd";
import FullPageLoader from "../components/loader";

// Services
import { userSignup } from "../services/user.services";

const { Option } = Select;

const EmpSignupForm = ({ onSubmit, role }) => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        location: "Select the Location",
        password: "",
        code: "",
      }}
      validationSchema={SingupFormEmpSchema}
      onSubmit={(values) => {
        //TEMPORARY
        delete values.code;
        values.role = role;
        console.log(values);
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
        setFieldValue,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className="auth_form">
          <Input
            type="text"
            onChange={handleChange}
            name="name"
            onBlur={handleBlur}
            touched={touched}
            value={values.name}
            placeholder="Your Name"
            className="auth_input"
          />

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

          <Select
            name="location"
            placeholder="Select the Location"
            value={values.location}
            onBlur={handleBlur}
            onChange={(location) => setFieldValue("location", location)}
            touched={touched.location}
            className="addDog_select"
          >
            <Option value="pakistan">Pakistan</Option>
            <Option value="india">India</Option>
            <Option value="china">China</Option>
            <Option value="afghanistan">Afghanistan</Option>
          </Select>
          {values.email &&
          values.name &&
          values.password &&
          values.code &&
          values.location === "Select the Location" ? (
            <div className="text-danger">Location is required</div>
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

          <Input
            type="text"
            name="code"
            placeholder="Signup code"
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched}
            value={values.code}
            className="auth_input"
          />
          {errors.code && touched.code ? (
            <div className="text-danger">{errors.code}</div>
          ) : null}

          <Button
            type="primary"
            className="auth_btn"
            htmlType="submit"
            disabled={values.location === "Select the Location"}
          >
            Signup
          </Button>
        </form>
      )}
    </Formik>
  );
};

const UserSignupForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={SingupFormUserSchema}
      onSubmit={(values) => {
        // delete values.role;
        console.log(values);
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
            type="text"
            onChange={handleChange}
            name="name"
            onBlur={handleBlur}
            touched={touched}
            value={values.name}
            placeholder="Your Name"
            className="auth_input"
          />

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
            Signup
          </Button>
        </form>
      )}
    </Formik>
  );
};

const Signup = ({ userSignup, history }) => {
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);

  const signup = (data) =>
    new Promise((resolve, reject) => {
      userSignup(data, resolve, reject);
    });

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      await signup(values);
      setTimeout(() => {
        setIsLoading(false);
        history.push("/");
      }, 300);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onChangeRadioButton = (e) => {
    setRole(e.target.value);
  };

  if (isLoading) return <FullPageLoader />;

  if (role === "user")
    return (
      <div className="auth_form_container">
        <div className="auth_form_wrapper">
          <div className="auth_radio_wrapper">
            <Radio.Group
              onChange={onChangeRadioButton}
              value={role}
              className="auth_radio_btn"
            >
              <Radio value={"user"}>User</Radio>
              <Radio value={"employee"}>Charity worker</Radio>
            </Radio.Group>
          </div>
          <UserSignupForm onSubmit={onSubmit} />
        </div>
      </div>
    );
  else if (role === "employee")
    return (
      <div className="auth_form_container">
        <div className="auth_form_wrapper">
          <div className="auth_radio_wrapper">
            <Radio.Group
              onChange={onChangeRadioButton}
              value={role}
              className="auth_radio_btn"
            >
              <Radio value={"user"}>User</Radio>
              <Radio value={"employee"}>Charity worker</Radio>
            </Radio.Group>
          </div>
          <EmpSignupForm onSubmit={onSubmit} role={role} />
        </div>
      </div>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      userSignup,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
