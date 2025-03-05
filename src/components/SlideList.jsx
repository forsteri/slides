import React, { useState } from 'react';
import { FileText, BookOpen, Calendar, Edit } from 'lucide-react';
import slidesData from '../data/slides.json';

const SlideList = () => {
  const [activeTab, setActiveTab] = useState('published'); // 'published' または 'drafts'
  
  const slides = activeTab === 'published' ? slidesData.published : slidesData.drafts;
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Slides Collection
          </h1>
          <p className="text-xl text-gray-600">
            スライドコレクション
          </p>
        </div>
        
        {/* タブ切り替え */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 ${activeTab === 'published' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('published')}
          >
            公開済み
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'drafts' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('drafts')}
          >
            下書き
          </button>
        </div>

        <div className="space-y-4">
          {slides.length === 0 ? (
            <p className="text-center text-gray-500 py-8">スライドがありません</p>
          ) : (
            slides.map((slide, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-grow">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{slide.date}</span>
                    </div>
                    <h3 className="text-lg text-gray-900">
                      {slide.title}
                    </h3>
                    {slide.status === 'draft' && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        <Edit className="inline w-3 h-3 mr-1" />
                        ドラフト
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 ml-4">
                    {/* 既存のボタン */}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SlideList;