import Header from "../components/Header";
import SignUpForm from "../components/SignUpForm";
import Footer from "../components/Footer";


export default function SignUp() {
  return (
    <div className="flex h-screen">
      <div className="flex-grow flex items-center justify-center p-4 bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
          <Header />
          <div className="h-4"></div>
          <p className="text-center text-gray-600 mb-6">Create an account</p>
          <SignUpForm />
          <p className="text-center text-blue-600 mt-6">
            Already have an account?{" "}
            <a href="/login" className="font-semibold">
              Log in
            </a>
          </p>
          <Footer />
        </div>
      </div>
    </div>
  );
}
