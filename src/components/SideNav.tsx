import { Heading, Link, SkeletonText, VStack } from "@chakra-ui/react";
import { Category } from "../types";

type Props = {
  categories: Category[];
  loading: boolean;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
};

const selectedProps = {
  bgColor: "blue.400",
  color: "white",
  fontWeight: "bold",
};

function SideNav({
  categories,
  selectedCategory,
  setSelectedCategory,
  loading,
}: Props) {
  return loading ? (
    <SkeletonText mt="1" noOfLines={13} spacing="7" skeletonHeight="3" />
  ) : (
    <>
      <Heading color="blue.400" fontSize={14} fontWeight="bold" mb={4}>
        CATEGORIAS
      </Heading>
      <VStack align="stretch">
        {categories.map((category) => (
          <Link
            onClick={() => setSelectedCategory(category)}
            px={2}
            py={1}
            borderRadius={5}
            _hover={{ textDecoration: "none" }}
            key={category.strCategory}
            {...(selectedCategory.strCategory === category.strCategory &&
              selectedProps)}
          >
            {category.strCategory}
          </Link>
        ))}
      </VStack>
    </>
  );
}

export default SideNav;
