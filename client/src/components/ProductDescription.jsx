import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ProductDescription = ({ description }) => {
  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
      <h5 className="text-2xl font-semibold text-gray-800 mb-4">
        Mô tả sản phẩm
      </h5>
      {description ? (
        <div className="prose prose-slate max-w-none text-sm leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {description}
          </ReactMarkdown>
        </div>
      ) : (
        <p className="text-gray-500 italic">
          Hiện chưa có mô tả cho sản phẩm này.
        </p>
      )}
    </div>
  );
};

export default ProductDescription;
