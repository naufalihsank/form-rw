import { extend } from "vee-validate";
import { required, max, numeric, min_value, size, ext } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required"
});

extend("numeric", {
  ...numeric,
  message: "This field must only contain numeric characters"
});

extend("max", {
  ...max
});

extend("min_value", {
  ...min_value,
  message: (value, args) => {
    return `You must be ${args.min} years old or older `;
  }
});

extend("size", {
  ...size,
  message: (value, args) => {
    return `File size should be less than ${args.size/1000} MB`;
  }
});

extend("ext", {
  ...ext,
  message: "The image format must be jpg, jpeg, png, or bmp"
});
