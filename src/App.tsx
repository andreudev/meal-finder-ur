import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import MainContent from "./components/MainContent";
import { Fragment, useState } from "react";
import { Category, Meal, SearchFrom } from "./types";
import useHttpData from "./hooks/useHttpData";
import axios from "axios";
import RecipeModal from "./components/RecipeModal";

const url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

const makeMealUrl = (category: Category) =>
  `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`;

const defaultCategory: Category = { strCategory: "Beef" };

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(defaultCategory);

  const { data, loading } = useHttpData<Category>(url);
  const {
    data: dataMeal,
    loading: loadingMeal,
    setData: setMeals,
    setLoading: setLoadingMeal,
  } = useHttpData<Meal>(makeMealUrl(selectedCategory));

  const searchApi = (searchForm: SearchFrom) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchForm.search}`;
    setLoadingMeal(true);
    axios
      .get<{ meals: Meal[] }>(url)
      .then(({ data }) => setMeals(data.meals))
      .finally(() => setLoadingMeal(false));
  };

  console.log(dataMeal);

  return (
    <Fragment>
      <Grid
        fontSize={14}
        templateAreas={`"header header"
                    "nav main"`}
        gridTemplateRows={"60px 1fr"}
        gridTemplateColumns={{ sm: `0 1fr`, md: `250px 1fr` }}
      >
        <GridItem
          pt="7px"
          bg="white"
          area={"header"}
          position={"sticky"}
          top={"0"}
          zIndex={1}
          boxShadow={"lg"}
        >
          <Header onSubmit={searchApi} />
        </GridItem>
        <GridItem
          p="5"
          area={"nav"}
          height="calc(100vh - 60px)"
          position="sticky"
          top="60px"
          left="0"
          overflowY="auto"
        >
          <SideNav
            categories={data}
            loading={loading}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </GridItem>
        <GridItem p="4" bg="gray.100" area={"main"}>
          <MainContent
            meals={dataMeal}
            loading={loadingMeal}
            openRecipe={onOpen}
          />
        </GridItem>
      </Grid>
      <RecipeModal isOpen={isOpen} onClose={onClose} />
    </Fragment>
  );
}

export default App;
