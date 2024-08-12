import toast, { Toaster } from 'react-hot-toast';

export default function SignUpForm() {
  const handleSignUp = async (event) => {
    event.preventDefault();
    // Get form data
    const formData = new FormData(event.target);
    const data = {
      student_id: formData.get("student_id"),
      fname: formData.get("fname"),
      lname: formData.get("lname"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      //Replace with IP address of your machine
      const response = await fetch("http://127.0.0.1:5000/api/add_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Successfully Signed Up", {
          position: "top-center",
        });
        // Redirect to login page
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        const errorResult = await response.json();
        toast.error("Invalid Details Entered", {
          position: "top-center",
        }); // Display error message
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Problem Occured", {
        position: "top-center",
      });
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4 w-full">
      <Toaster />
      <div>
        <label className="sr-only" htmlFor="student_id">
          Student ID
        </label>
        <input
          type="text"
          id="student_id"
          name="student_id"
          placeholder="Student ID"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div>
        <label className="sr-only" htmlFor="fname">
          First Name
        </label>
        <input
          type="text"
          id="fname"
          name="fname"
          placeholder="First Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div>
        <label className="sr-only" htmlFor="lname">
          Last Name
        </label>
        <input
          type="text"
          id="lname"
          name="lname"
          placeholder="Last Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div>
        <label className="sr-only" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div>
        <label className="sr-only" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <button
        type="submit"
        className="block w-full text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800"
      >
        Sign Up
      </button>
    </form>
  );
}
