import { useState } from "react";
import { auth } from "../../config/firebase";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onForgetPassword = () => {
    if (email.length) {
      setIsSubmitted(true);
      auth
        .sendPasswordResetEmail(email)
        .then((_) => {})
        .catch((err) => console.error(err));
    }
  };

  return isSubmitted ? (
    <section className="h-full w-full flex-center">
      <section className="shadow-lg rounded-lg mt-4 mx-auto max-w-lg border-l-8 border-blue-700 bg-white p-4 w-full md:w-2/4 lg:w-1/4">
        If your email is associated with an account, you will receive a reset
        link by email
      </section>
    </section>
  ) : (
    <section className="h-full w-full flex-center">
      <section className="md:shadow-lg rounded-lg mt-4 mx-auto max-w-lg md:border-l-8 border-blue-700 bg-white p-4 w-full md:w-2/4 lg:w-1/4">
        <header className="text-blue-400">
          Did you forgot your password ?
        </header>
        <article>
          <input
            type="email"
            placeholder="Type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={onForgetPassword}
            className="btn btn-blue my-4"
            type="submit"
          >
            Send reset link
          </button>
        </article>
      </section>
    </section>
  );
};

export default ForgetPassword;
