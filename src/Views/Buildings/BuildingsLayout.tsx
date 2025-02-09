import { Container } from "../../components";
import { Outlet } from "react-router-dom";

export default function Buildings() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}
