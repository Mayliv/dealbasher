
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Clock, MessageSquare } from "lucide-react";

interface SortingTabsProps {
  activeTab: string;
  onChangeTab: (value: string) => void;
}

const SortingTabs: React.FC<SortingTabsProps> = ({
  activeTab,
  onChangeTab
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onChangeTab} className="mb-4">
      <TabsList className="grid grid-cols-3 w-full sm:w-auto">
        <TabsTrigger value="hot" className="flex items-center space-x-1">
          <Flame className="h-4 w-4" />
          <span>Горячее</span>
        </TabsTrigger>
        <TabsTrigger value="new" className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>Новое</span>
        </TabsTrigger>
        <TabsTrigger value="discussed" className="flex items-center space-x-1">
          <MessageSquare className="h-4 w-4" />
          <span>Обсуждаемое</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SortingTabs;
