import react, { useState } from "react";
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
    <section className="h-full w-full center-with-flex">
      <section className="auth-wrapper p-8 w-full md:w-2/4">
        If your email is associated with an account, you will receive a reset
        link by email
      </section>
    </section>
  ) : (
    <section className="h-full w-full center-with-flex">
      <section className="auth-wrapper p-4 w-full md:w-2/4 lg:w-1/4">
        <header>Did you forgot your password ?</header>
        <article>
          <input
            type="email"
            className="form-input my-4"
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
