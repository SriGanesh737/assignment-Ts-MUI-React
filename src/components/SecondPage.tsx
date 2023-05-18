import  { useEffect, useState } from 'react';
import Component1 from './Component1';
import { useNavigate } from 'react-router-dom';
import Component2 from './Component2';


const SecondPage = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState<any>(null);
    const departments = [
        {
            department: 'customer_service',
            sub_departments: ['support', 'customer_success'],
        },
        {
            department: 'design',
            sub_departments: ['graphic_design', 'product_design', 'web_design'],
        },
    ];


    useEffect(() => {
        // Retrieve user details from localStorage
        const storedUserDetails = localStorage.getItem('userDetails');

        if (storedUserDetails) {
            setUserDetails(JSON.parse(storedUserDetails));
        }
        else {
                alert('Please enter your details on the first page before accessing this page.')
                navigate('/');
        }
    }, []);

    return (
        <div>
            <h1>Second Page</h1>
            {userDetails ? (
                <div>
                    <p>Name: {userDetails.name}</p>
                    <p>Phone: {userDetails.phone}</p>
                    <p>Email: {userDetails.email}</p>
                </div>
            ) : (
                <p>Please enter your details on the first page before accessing this page.</p>
            )}

            <h1>Component-2</h1>
            <Component2 departments={departments} />
            <h1>Component-1</h1>
            <Component1 />

        </div>
    );
};

export default SecondPage;
