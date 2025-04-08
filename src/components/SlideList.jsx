import React from "react";
import { FileText, BookOpen, Calendar } from "lucide-react";
import slidesData from "../data/slides.json";

const SlideList = () => {
  // 公開済みスライドのみを使用
  const slides = slidesData.published || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Slides Collection
          </h1>
          <p className="text-xl text-gray-600">スライドコレクション</p>
        </div>

        <div className="space-y-4">
          {slides.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              スライドがありません
            </p>
          ) : (
            slides.map((slide, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-grow">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{slide.date}</span>
                    </div>
                    <h3 className="text-lg text-gray-900">{slide.title}</h3>
                  </div>
                  <div className="flex items-center space-x-4 ml-4">
                    <button
                      onClick={() => window.open(slide.htmlPath, "_blank")}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                      title="スライドを閲覧"
                    >
                      <BookOpen className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => window.open(slide.pdfPath, "_blank")}
                      className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full transition-colors"
                      title="PDFをダウンロード"
                    >
                      <FileText className="w-5 h-5" />
                    </button>
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
