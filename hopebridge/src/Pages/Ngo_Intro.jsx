import React, { useEffect, useState } from 'react';
import './Ngo_Intro.css'; // Ensure CSS file exists

const AboutNGOsPage = () => {
    const [ngos, setNgos] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNgos() {
            try {
                const response = await fetch('http://127.0.0.1:5000/ngo/list'); 
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                console.log("Fetched NGOs:", data); 
                setNgos(data);
            } catch (error) {
                console.error('Error fetching NGOs:', error);
            } finally {
                setLoading(false); 
            }
        }
        fetchNgos(); 
    }, []);

    return (
        <div className="about-ngos-page">
            <h1>About the NGOs</h1>

            <section className="ngo-section">
                <h2>What is an NGO?</h2>
                <p>
                    A Non-Governmental Organization (NGO) is a nonprofit organization that operates independently of any government. 
                    NGOs focus on addressing social, environmental, and humanitarian issues by engaging in advocacy, research, and direct actions.
                </p>
            </section>

            <section className="ngo-section">
                <h2>Our Partnered NGOs</h2>
                <p>
                    We collaborate with various NGOs to support causes ranging from education and health to environmental sustainability and human rights. 
                    These NGOs work tirelessly to create lasting impacts in communities and improve the lives of those in need.
                </p>

                {/* Display NGOs */}
                {loading ? (
                    <p>Loading NGOs...</p>
                ) : ngos.length > 0 ? (
                    <ul>
                        {ngos.map((ngo) => (
                            <li key={ngo.ngo_id}>
                                <strong>{ngo.ngo_name}</strong> ({ngo.ngo_type}) <br />
                                Sector: {ngo.sector} <br />
                                Location: {ngo.district}, {ngo.state}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No NGOs found.</p>
                )}
            </section>

            <section className="ngo-section">
                <h2>How Can You Help?</h2>
                <p>
                    NGOs depend on the generosity of individuals like you to fund their projects and make a positive difference. 
                    By donating, volunteering, or raising awareness, you can play a vital role in the success of these initiatives.
                </p>
            </section>
        </div>
    );
};

export default AboutNGOsPage;
