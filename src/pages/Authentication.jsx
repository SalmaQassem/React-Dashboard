import AuthForm from "../components/Auth/AuthForm";
import InputForm from "../components/UI/InputForm";

const Authentication = () => {
  return (
    <InputForm>
      <AuthForm />
    </InputForm>
  );
};

export default Authentication;

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const enteredData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  let response = "";
  try {
    response = await fetch("https://zadapp.mqawilk.com/api/login", {
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
