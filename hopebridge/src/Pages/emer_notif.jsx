import React from 'react';
import emergencyNews from 'C:/Users/admin/Desktop/21_4_Brain_Cells/backend/app/routes/relevant_emergency_news.json';
import './emer_notif.css';
import NavNgo from '../Components/NavNgo.jsx'
import { Link } from 'react-router-dom';


// Sort by severity (recent dates first)
const sortedNews = emergencyNews.relevant_emergency_news.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));

export default function EmergencyNotifications() {
  return (
    <div className="notification-container">
      <NavNgo/>
      <h1 className="notification-title">Emergency Notifications</h1>
      <div className="notification-grid">
        {sortedNews.map((news, index) => (
          <div key={index} className="notification-card">
            <h3 className="notification-card-title">{news.title}</h3>
            <p className="notification-region">Region: {news.region}</p>
            <p className="notification-date">Date: {news.published_date}</p>
            <a href={news.link} target="_blank" rel="noopener noreferrer" className="notification-link">
              Read more
            </a>
            <Link to="/add-request" className="nav-link-notif">Help them out!</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
