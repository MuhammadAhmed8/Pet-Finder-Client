import * as Yup from "yup";

const AddDogFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  image: Yup.string().required("Image is required"),
  color: Yup.string().required("Color is required"),
  about: Yup.string().required("Please write something about your dog"),
  weight: Yup.string().required("Weight is required"),
  age: Yup.string().required("Age is required"),
});

export default AddDogFormSchema;
