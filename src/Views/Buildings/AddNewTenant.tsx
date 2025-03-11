import { Modal } from "../../components";
import styled from "styled-components";

import { useState } from "react";
import {
  useCrateBuildings,
  useNavs,
  useRouteParams,
  useTabLoader,
} from "../../hooks";
import { useDebouncedCallback } from "use-debounce";
import toast from "react-hot-toast";
import { ApiError } from "../../api/axios";

const StyledCreateBuilding = styled.div`
  width: 100vw;
  height: 100vh;

  h2 {
    color: ${({ theme }) => theme.colors.accent};
  }

  .modal-create {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .buttons {
      display: flex;
      align-items: flex-end;
      justify-content: end;
    }
  }
`;

const AddNewTenant = () => {
  const loader = useTabLoader();
  const { buildingId } = useRouteParams<{ buildingId?: string }>();
  const { handleGoBack } = useNavs();

  const goBack = () => {
    if (buildingId) {
      handleGoBack({ fallback: "building", props: { buildingId: buildingId } });
    }
  };

  const onSuccess = () => {
    toast.success("La casa ha sido creada");
    goBack();
  };

  const onLoginError = (error: ApiError) => toast.error(error.message);

  const createMutation = useCrateBuildings({
    onSuccess: onSuccess, // ✅ Redirect after success
    onError: onLoginError,
  });

  const [name, setName] = useState<string>(""); // ✅ Ensured state is properly initialized

  const handleCreateBuilding = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const debouncedCrate = useDebouncedCallback(() => {
    if (!name.trim()) return; // ✅ Prevents submitting an empty string
    loader.start();
    createMutation.mutate(name);
    loader.complete();
  }, 500);

  return (
    <StyledCreateBuilding>
      <Modal isOpen onClose={goBack} className="fade-in">
        <h2>Crear pendejo</h2>
        <form className="modal-create" onSubmit={handleCreateBuilding}>
          <div className="inputs">
            <label htmlFor="name">Nombre de la casa</label>
            <input
              type="text"
              id="name"
              placeholder="Casa de los chinos..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="buttons">
            <button
              style={{ marginRight: "1rem" }}
              type="submit"
              disabled={createMutation.isPending} // ✅ Prevents multiple requests
            >
              Crear
            </button>
            <button className="secondary-button" onClick={goBack}>
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </StyledCreateBuilding>
  );
};

export default AddNewTenant;
