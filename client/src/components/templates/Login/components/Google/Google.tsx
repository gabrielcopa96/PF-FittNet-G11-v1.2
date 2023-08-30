import { GoogleLogin } from '@react-oauth/google';
import { useHandleGoogle } from '../../hooks/useHandleGoogle';

const Google = (): JSX.Element => {

    const { handleGoogle } = useHandleGoogle()

    return (
        <GoogleLogin
            onSuccess={async (credentialResponse: any) => await handleGoogle(credentialResponse)}
            onError={() => {
                console.log('Login Failed');
            }}
            theme="outline"
            shape="pill"
            useOneTap
        />
    )
}

export default Google;