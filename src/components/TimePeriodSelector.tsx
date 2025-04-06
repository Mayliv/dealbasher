
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface TimePeriodSelectorProps {
  activePeriod: string;
  onChangePeriod: (value: string) => void;
}

const TimePeriodSelector: React.FC<TimePeriodSelectorProps> = ({
  activePeriod,
  onChangePeriod
}) => {
  return (
    <div className="flex flex-col items-start space-y-2 mb-4">
      <p className="text-sm text-muted-foreground">
        Самые популярные предложения, выбранные сообществом, отсортированные по температуре:
      </p>
      <ToggleGroup type="single" value={activePeriod} onValueChange={(value) => value && onChangePeriod(value)}>
        <ToggleGroupItem value="today">Сегодня</ToggleGroupItem>
        <ToggleGroupItem value="week">Неделя</ToggleGroupItem>
        <ToggleGroupItem value="month">Месяц</ToggleGroupItem>
        <ToggleGroupItem value="all">Всё время</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default TimePeriodSelector;
