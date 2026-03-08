
import React from 'react';
import { categories } from '@/utils/data';
import { Link, useLocation } from 'react-router-dom';

interface CategoryBarProps {
  activeCategoryId?: string;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ activeCategoryId = 'all' }) => {
  const location = useLocation();
  const isBugsPage = location.pathname === '/bugs';

  return (
    <div className="bg-card shadow-sm mb-6 overflow-x-auto border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex space-x-6 py-3 whitespace-nowrap">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className={`font-medium transition-colors ${
                category.id === activeCategoryId && !isBugsPage
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {category.name}
            </Link>
          ))}
          <Link
            to="/bugs"
            className={`font-medium transition-colors flex items-center gap-1 ${
              isBugsPage
                ? 'text-destructive'
                : 'text-muted-foreground hover:text-destructive'
            }`}
          >
            🐛 Баги цен
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
