
import styles from './Sign.module.css'
import { useAuth } from '../../Authorization/Auth';

type SignInAction = 'signin' | 'signin-callback';

interface Props {
    action: SignInAction
}

export const SignIn = ({ action }: Props) => {
    const { signIn } = useAuth();
    if (action === 'signin')
          signIn();
    
    return (
        <div className={styles.sign}>Signin in...</div>
    )
}
