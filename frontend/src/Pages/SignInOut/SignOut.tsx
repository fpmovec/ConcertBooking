import { useAuth } from "../../Authorization/Auth";
import styles from './Sign.module.css'

type SignOutAction = 'signout' | 'signout-callback'

interface Props {
    action: SignOutAction;
}

export const SignOutPage = ({ action }: Props) => {
   let message = 'Signing Out...';
   const { signOut } = useAuth();

   switch (action) {
    case "signout":
        signOut();
        break;
    case "signout-callback":
        message = 'You successfully signed out';
        break;
   }

   return <div className={styles.sign}>{message}</div>
}