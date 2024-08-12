import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";

export default function Login() {
  return (
    <div className="flex h-screen">
      <div className="bg-gray-100 flex flex-grow items-center justify-center h-screen">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg flex flex-col items-center">
          <Header />
          <div className="h-4"></div>
          <LoginForm />
          <Footer />
        </div>
      </div>
    </div>
  );
}
