import React, { useState, useEffect } from 'react';
import axios from 'axios';
const DummyListPage = () => {
    const [dummyData, setDummyData] = useState([]);
    const [formData, setFormData] = useState({ name: '', country: '' });

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        if (!formData.name || !formData.country) {
            alert("Please enter both name and country");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/Users', formData);
            console.log('Data posted:', response.data);
            setDummyData([...dummyData, response.data]); 
            setFormData({ name: '', country: '' });
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/Users');
                console.log('Fetched data:', response.data);
                setDummyData(response.data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='container'>
            <h1 style={{margin:'10px'}}>All Users</h1>
            <form className='form' onSubmit={handleSubmit}>
                <input
                    className='input'
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                />
                <input
                    className='input'
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter country"
                />
                <button className='button' type="submit">Add</button>
            </form>
            <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyData ? dummyData.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.country}</td>
                            </tr>
                        )) : <tr><td colSpan="2">No data available</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DummyListPage;

