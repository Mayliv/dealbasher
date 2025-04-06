
import React from 'react';
import { categories } from '@/utils/data';
import { Link } from 'react-router-dom';

interface CategoryBarProps {
  activeCategoryId?: string;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ activeCategoryId = 'all' }) => {
  return (
    <div className="bg-white shadow-sm mb-6 overflow-x-auto">
      <div className="container mx-auto px-4">
        <div className="flex space-x-6 py-3 whitespace-nowrap">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className={`font-medium transition-colors ${
                category.id === activeCategoryId 
                  ? 'text-deal-red' 
                  : 'text-deal-dark hover:text-deal-red'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
