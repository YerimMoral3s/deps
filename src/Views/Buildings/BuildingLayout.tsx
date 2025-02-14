import { Container } from "../../components";
import { Outlet } from "react-router-dom";

export default function Building() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}
