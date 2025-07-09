import FormLogin from "./pages/FormLogin";
import FormRegister from "./pages/FormRegister";
import FormSignIn from "./pages/FormSignIn";
import FormSignUp from "./pages/FormSignUp";
import UserForm from "./pages/UserForm";

function App() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 mt-3">
      <FormSignIn />
      <FormSignUp />
      <FormRegister />
      <FormLogin />
      <UserForm />
    </div>
  );
}

export default App;
