import { useActionData, useNavigate } from "react-router-dom";
import InputForm from "../components/UI/InputForm";
import ForgetPasswordForm from "../components/ForgetPassword/ForgetPasswordForm";
import { useEffect } from "react";

const ForgetPassword = () => {
  const data = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.message) {
      navigate("/CheckCode");
    } else {
      //console.log(data);
    }
  }, [data]);

  return (
    <InputForm>
      <ForgetPasswordForm />
    </InputForm>
  );
};

export default ForgetPassword;

export async function action({ request }) {
  const formData = await request.formData();
  const email = { email: formData.get("email") };
  console.log(email);
  let response = "";
  try {
    response = await fetch("https://zadapp.mqawilk.com/api/password/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
  } catch (error) {
    console.log(error.message);
  }
  return response;
}
