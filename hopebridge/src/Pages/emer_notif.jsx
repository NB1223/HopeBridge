import React from 'react';
import emergencyNews from 'C:/Users/divyae/Documents/21_4_Brain_Cells/backend/app/routes/relevant_emergency_news.json';

// Sort by severity (recent dates first)
// const sortedNews = emergencyNews.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
const sortedNews = emergencyNews.relevant_emergency_news.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));


export default function EmergencyNotifications() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Emergency Notifications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedNews.map((news, index) => (
          <div key={index} className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
            <p className="text-sm text-gray-600">Region: {news.region}</p>
            <p className="text-sm text-gray-600">Date: {news.published_date}</p>
            <a href={news.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-2 inline-block">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
