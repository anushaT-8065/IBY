import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LandingPage from '../components/LandingPage';


export default function LandingPage() {
    return <LandingPage />;
    const history = useHistory();

    useEffect(() => {
        // Redirect to login page after 3 seconds
        const timer = setTimeout(() => {
            history.push('/login');
        }, 3000); // 3000 milliseconds = 3 seconds

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, [history]);

    return (
        <div className="landing-background flex justify-center items-center h-screen">
            <h1 className="text-white text-4xl font-bold">Welcome to Our App!</h1>
        </div>
    );
}

