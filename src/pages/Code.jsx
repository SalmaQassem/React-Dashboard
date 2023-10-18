import { useActionData, useNavigate } from "react-router-dom";
import InputForm from "../components/UI/InputForm";
import CodeForm from "../components/ForgetPassword/CodeForm";
import { useEffect } from "react";

const Code = () => {
  const data = useActionData();
  const navigate = useNavigate();
  useEffect(() => {
    if (data && data.code) {
      sessionStorage.setItem("otp", data.code);
      navigate("/ResetPassword");
    }
  }, [data]);
  return (
    <InputForm>
      <CodeForm />
    </InputForm>
  );
};

export default Code;

export async function action({ request }) {
  const formData = await request.formData();
  const checkCode = { code: formData.get("code") };
  console.log(checkCode);
  let response = "";
  try {
    response = await fetch(
      "https://zadapp.mqawilk.com/api/password/code/check",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkCode),
      }
    );
  } catch (error) {
    console.log(error.message);
  }
  return response;
}
