
import React from 'react';
import { categories } from '@/utils/data';

const CategoryBar: React.FC = () => {
  return (
    <div className="bg-white shadow-sm mb-6 overflow-x-auto">
      <div className="container mx-auto px-4">
        <div className="flex space-x-6 py-3 whitespace-nowrap">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="text-deal-dark hover:text-deal-red font-medium transition-colors"
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
