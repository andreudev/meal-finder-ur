import {
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IoSearch } from "react-icons/io5";
import { SearchFrom } from "../types";

type Props = {
  onSubmit: (data: SearchFrom) => void;
};

function Header({ onSubmit }: Props) {
  const { register, formState, handleSubmit } = useForm<SearchFrom>();
  return (
    <Container maxW={"3xl"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <IoSearch color="gray" />
          </InputLeftElement>
          <Input
            focusBorderColor={formState.errors.search ? "crimson" : "blue.400"}
            isInvalid={!!formState.errors.search}
            {...register("search", { required: true })}
            type="text"
            placeholder="Intenta con 'chiken o 'beans'..."
          />
          <Button type="submit" bgColor="blue.400" color="white" ml={2}>
            Buscar
          </Button>
        </InputGroup>
      </form>
    </Container>
  );
}

export default Header;
