import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  id: number;
  title: string;
  time: number;
  difficulty: string;
  image?: string | null;
}

export default function RecipeCard({
  id,
  title,
  time,
  difficulty,
  image,
}: RecipeCardProps) {
  return (
    <Link to={`/recipes/${id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="bg-muted aspect-video overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-5xl">
              🍽️
            </div>
          )}
        </div>

        <CardContent className="space-y-3 pt-5">
          <h3 className="line-clamp-2 text-lg font-semibold">{title}</h3>

          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            {time} min
          </div>
        </CardContent>

        <CardFooter>
          <Badge>{difficulty}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
