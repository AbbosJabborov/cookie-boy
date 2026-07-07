import { Link } from "react-router-dom";
import { Clock3, Users, ArrowRight, Wallet } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  id: number;
  title: string;
  image?: string | null;
  difficulty: string;
  time: number;
}

export default function RecipeCard({
  id,
  title,
  image,
  difficulty,
  time,
}: Props) {
  const color =
    difficulty.toLowerCase() === "easy"
      ? "bg-green-500"
      : difficulty.toLowerCase() === "medium"
        ? "bg-yellow-500"
        : "bg-red-500";

  return (
    <Link to={`/recipes/${id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="relative">
          {image ? (
            <img
              src={image}
              className="h-56 w-full object-cover transition duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex h-56 items-center justify-center bg-orange-50 text-7xl">
              🍝
            </div>
          )}

          <Badge className={`absolute top-4 left-4 text-white ${color}`}>
            {difficulty}
          </Badge>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <h3 className="text-xl font-bold">{title}</h3>

            <p className="text-muted-foreground mt-1 text-sm">
              AI optimized recipe with smart ingredient replacements.
            </p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <Clock3 size={15} />
                {time} min
              </div>

              <div className="flex items-center gap-1">
                <Users size={15} />2
              </div>
            </div>

            <div className="flex items-center gap-1 font-semibold text-green-600">
              <Wallet size={15} />
              52k UZS
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-green-600">
              ✓ Products Available
            </span>

            <ArrowRight
              className="transition group-hover:translate-x-1"
              size={18}
            />
          </div>
        </div>
      </Card>
    </Link>
  );
}
