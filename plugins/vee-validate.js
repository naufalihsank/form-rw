import { extend } from "vee-validate";
import { required, max, numeric } from "vee-validate/dist/rules";

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

extend("above-25", {
  message: "You must be 25 years old or older",
  validate: (value) => {
    return value >= 25;
  }
});
