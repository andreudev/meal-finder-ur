import { SimpleGrid } from "@chakra-ui/react";
import { Meal } from "../types";
import MealCard from "./MealCard";
import SkeletonCard from "./SkeletonCard";

type Props = {
  meals: Meal[];
  loading: boolean;
  openRecipe: (meal: Meal) => void;
};

function MainContent({ meals, loading, openRecipe }: Props) {
  const skeletons = [1, 2, 3, 5, 6, 7, 8];
  return (
    <SimpleGrid columns={[2, null, 3, null, 5]} spacing="20px">
      {loading && skeletons.map((skeleton) => <SkeletonCard key={skeleton} />)}
      {!loading &&
        meals.map((meal) => (
          <MealCard
            openRecipe={() => openRecipe(meal)}
            meal={meal}
            key={meal.idMeal}
          />
        ))}
    </SimpleGrid>
  );
}

export default MainContent;
