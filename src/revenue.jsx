import React, { useEffect, useState } from 'react';

const Revenue = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('https://klemz-backend.onrender.com/appointment/appointments/get/all');
                const data = await response.json();

                console.log(data)

                if (Array.isArray(data)) {
                    const total = data.reduce((sum, appointment) => {
                        const price = parseFloat(appointment?.haircutID?.price) || 0;
                        return sum + price;
                    }, 0);

                    setTotalRevenue(total);
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="p-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-700">Total Revenue</h2>
                <p className="text-4xl font-bold text-green-600 mt-2">₵{totalRevenue.toFixed(2)}</p>
            </div>

            <h1 className="text-xl font-semibold mb-2">Revenue Page</h1>
            <p className="text-gray-600">Welcome to the Revenue management section.</p>
        </div>
    );
};

export default Revenue;
