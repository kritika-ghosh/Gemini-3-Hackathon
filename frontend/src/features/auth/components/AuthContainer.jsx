import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";

export const AuthContainer = ({ title, description, children }) => {
  return (
    <Card className="w-full max-w-md shadow-xl border-border bg-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-foreground">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
};
