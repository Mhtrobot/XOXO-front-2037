import HeaderPage from "./HeaderPage.jsx";
import FooterPage from "./FooterPage.jsx";
import Form from "./Form.jsx";

const LoginPage = () => {
  return(
      <>
          <HeaderPage />
          <div className="login-form">
              <p>Fill the Form</p>
              <Form />
          </div>
          <FooterPage />
      </>
  );
}

export default LoginPage;