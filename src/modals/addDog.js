import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Select, message } from "antd";
import { Formik } from "formik";
import AddDogFormSchema from "../validations/AddDog.validations";
import FullPageLoader from "../components/loader";
import { Breeds } from "../json/dogBreeds";
import ReactFilestack from "filestack-react";

const { Option } = Select;
const { TextArea } = Input;

// Add a dog record - form
const AddDogForm = ({ onSubmit }) => {
  // FileStack helper methods
  const apiKey = "AuzDYQcwSXOtHarY0mlBcz";

  const basicOptions = {
    accept: "image/*",
    fromSources: ["local_file_system"],
    maxSize: 1024 * 1024,
    maxFiles: 1,
  };

  return (
    <Formik
      initialValues={{
        name: "",
        image: "",
        breed: "Select the Breed",
        color: "",
        age: "",
        weight: "",
        size: "Select the Size",
        gender: "Select the Gender",
        about: "",
        location: "Select the Location",
      }}
      validationSchema={AddDogFormSchema}
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
        setFieldValue,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className="addDog_modal">
          <Input
            type="text"
            onChange={handleChange}
            name="name"
            onBlur={handleBlur}
            touched={touched.name}
            value={values.name}
            placeholder="Name"
            className="addDog_input"
          />
          {errors.name && touched.name ? (
            <div className="text-danger">{errors.name}</div>
          ) : null}

          <Input
            type="text"
            onChange={handleChange}
            name="weight"
            onBlur={handleBlur}
            touched={touched.weight}
            value={values.weight}
            placeholder="Weight"
            className="addDog_input"
          />
          {errors.weight && touched.weight ? (
            <div className="text-danger">{errors.weight}</div>
          ) : null}

          <Input
            type="text"
            onChange={handleChange}
            name="age"
            onBlur={handleBlur}
            touched={touched.age}
            value={values.age}
            placeholder="Age"
            className="addDog_input"
          />
          {errors.age && touched.age ? (
            <div className="text-danger">{errors.age}</div>
          ) : null}

          <Input
            type="text"
            onChange={handleChange}
            name="color"
            onBlur={handleBlur}
            touched={touched.color}
            value={values.color}
            placeholder="Color"
            className="addDog_input"
          />
          {errors.color && touched.color ? (
            <div className="text-danger">{errors.color}</div>
          ) : null}

          <Select
            showSearch
            name="breed"
            placeholder="Select the breed"
            onChange={(breed) => setFieldValue("breed", breed)}
            value={values.breed}
            onBlur={handleBlur}
            className="addDog_select"
          >
            {Breeds.map((breed, index) => {
              return (
                <Option value={breed} key={index}>
                  {breed}
                </Option>
              );
            })}
          </Select>

          {errors.breed && touched.breed ? (
            <div className="text-danger">{errors.breed}</div>
          ) : null}

          <Select
            name="gender"
            placeholder="Select the gender"
            onChange={(gender) => setFieldValue("gender", gender)}
            value={values.gender}
            onBlur={handleBlur}
            className="addDog_select"
            touched={touched.location}
          >
            <Option key={0} value="male">
              Male
            </Option>
            <Option key={1} value="female">
              Female
            </Option>
          </Select>
          {errors.gender && touched.gender ? (
            <div className="text-danger">{errors.gender}</div>
          ) : null}

          <Select
            name="size"
            placeholder="Select the size"
            value={values.size}
            onBlur={handleBlur}
            onChange={(size) => setFieldValue("size", size)}
            className="addDog_select"
          >
            <Option key={0} value="small">
              Small
            </Option>
            <Option key={1} value="medium">
              Medium
            </Option>
            <Option key={2} value="large">
              Large
            </Option>
            <Option key={3} value="giant">
              Giant
            </Option>
          </Select>
          {errors.size && touched.size ? (
            <div className="text-danger">{errors.size}</div>
          ) : null}

          <Select
            name="location"
            placeholder="Select the Location"
            value={values.location}
            onBlur={handleBlur}
            onChange={(location) => setFieldValue("location", location)}
            className="addDog_select"
            touched={touched.location}
          >
            <Option value="alabama">Alabama</Option>
            <Option value="alaska">Alaska</Option>
            <Option value="california">California</Option>
            <Option value="indiana">Indiana</Option>
            <Option value="newyork"> New York</Option>
            <Option value="ohio"> Ohio</Option>
          </Select>
          {errors.location && touched.location ? (
            <div className="text-danger">{errors.location}</div>
          ) : null}

          <TextArea
            rows={4}
            name="about"
            onChange={(about) => setFieldValue("about", about.target.value)}
            onBlur={handleBlur}
            placeholder="Write something about your pet."
            maxLength={100}
            touched={touched.about}
            value={values.about}
          />
          {errors.about && touched.about ? (
            <div className="text-danger">{errors.about}</div>
          ) : null}

          {values.name &&
          values.weight &&
          values.age &&
          values.color &&
          values.about &&
          !(
            values.breed === "Select the Breed" &&
            values.gender === "Select the Gender" &&
            values.size === "Select the Size" &&
            values.location === "Select the Location"
          ) ? (
            <div className="text-danger">{errors.image}</div>
          ) : null}

          <div className="addDog_footer">
            <ReactFilestack
              apikey={apiKey}
              buttonText="Upload Photo"
              options={basicOptions}
              onSuccess={(result) => {
                setFieldValue("image", result.filesUploaded[0].url);
              }}
              onError={(error) => message.error(error)}
              preload={true}
              render={({ onPick }) => (
                <Button className="addDog_btn" onClick={onPick}>
                  Upload an Image
                </Button>
              )}
            />

            <Button
              type="primary"
              className="addDog_btn"
              htmlType="submit"
              disabled={
                !values.name ||
                !values.weight ||
                !values.age ||
                !values.color ||
                !values.about ||
                !values.image ||
                !(
                  values.breed !== "Select the Breed" &&
                  values.gender !== "Select the Gender" &&
                  values.size !== "Select the Size" &&
                  values.location !== "Select the Location"
                )
              }
            >
              Add
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export const AddDogModal = ({ addDogAPI, showModal, setShowModal }) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const onSubmit = async (values) => {
    setConfirmLoading(true);
    await addDogAPI(values);
    setVisible(false);
    setShowModal(false);
    setConfirmLoading(false);
  };

  useEffect(() => {
    setVisible(showModal);
  }, [showModal]);

  const handleCancel = () => {
    setVisible(false);
    setShowModal(false);
  };

  return (
    <>
      <Modal
        title="Add new dog"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose
      >
        <AddDogForm onSubmit={onSubmit} />
        {confirmLoading && <FullPageLoader />}
      </Modal>
    </>
  );
};
