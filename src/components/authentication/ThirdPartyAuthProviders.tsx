import { FunctionComponent } from "react";
import firebase from "firebase";
import { useHistory } from "react-router";
import { ReactComponent as GoogleIcon } from "../../assets/icons/auth-provider/google.svg";

const ThirdPartyAuthProviders: FunctionComponent<{
  onError: (err: Error) => void;
}> = ({ onError }) => {
  const history = useHistory();
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const onAuthenticate = (provider: firebase.auth.AuthProvider) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((_) => history.push("/ideas"))
      .catch((err) => onError(err));
  };
  return (
    <footer className="py-4">
      <small className="text-blue-400 text-center">
        Or authenticate with :
      </small>
      <article className="flex justify-center items-center text-gray-50 py-4">
        <GoogleIcon
          onClick={(_) => onAuthenticate(googleProvider)}
          className="mx-2 w-8 h-8 fill-current text-red-400 dark:text-gray-50 cursor-pointer"
        />
      </article>
    </footer>
  );
};

export default ThirdPartyAuthProviders;
