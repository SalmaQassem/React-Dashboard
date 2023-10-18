import InputForm from "../components/UI/InputForm";
import ResetForm from "../components/ForgetPassword/ResetForm";

const ResetPassword = () => {
  return (
    <InputForm>
      <ResetForm />
    </InputForm>
  );
};

export default ResetPassword;
export async function action({ request }) {
  const otp = sessionStorage.getItem("otp");
  const formData = await request.formData();
  const enteredData = {
    code: otp,
    password: formData.get("password"),
    password_confirmation: formData.get("confirmPassword"),
  };
  let response = "";
  try {
    response = await fetch("https://zadapp.mqawilk.com/api/password/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredData),
    });
  } catch (error) {
    console.log(error.message);
  }
  return response;
}
