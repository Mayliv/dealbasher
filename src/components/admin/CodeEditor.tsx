
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FileCode, Play, Save, AlertTriangle } from "lucide-react";

const CodeEditor: React.FC = () => {
  const { toast } = useToast();
  const [code, setCode] = useState(`// Пример редактируемого CSS
.custom-styles {
  color: var(--primary);
  background-color: var(--background);
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

/* Можно добавить свои стили здесь */
`);

  const handleSaveCode = () => {
    toast({
      title: "Код сохранен",
      description: "Изменения в коде применены",
    });
  };

  const handleApplyCode = () => {
    toast({
      title: "Код применен",
      description: "Код был применен к сайту",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Редактор кода</CardTitle>
        <CardDescription>
          Редактирование CSS и других элементов сайта
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <FileCode className="h-5 w-5 mr-2 text-primary" />
              <span className="font-medium">custom-styles.css</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleApplyCode}>
                <Play className="h-4 w-4 mr-1" /> Применить
              </Button>
              <Button size="sm" onClick={handleSaveCode}>
                <Save className="h-4 w-4 mr-1" /> Сохранить
              </Button>
            </div>
          </div>
          
          <div className="relative border rounded-md">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono text-sm p-4 w-full h-80 bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-gray-900 rounded-md"
            />
          </div>
          
          <div className="mt-4 flex items-start p-4 border rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Внимание</p>
              <p className="text-sm mt-1">
                Редактирование кода может привести к неожиданным изменениям в работе сайта. 
                Убедитесь, что у вас есть резервная копия перед внесением изменений.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeEditor;
