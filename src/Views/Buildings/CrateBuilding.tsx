import { Modal } from "../../components";
import styled from "styled-components";

import { useState } from "react";
import { useCrateBuilding, useNavs, useTabLoader } from "../../hooks";
import { useDebouncedCallback } from "use-debounce";
import toast from "react-hot-toast";
import { ApiError } from "../../api/axios";

const StyledCreateBuilding = styled.div`
  width: 100vw;
  height: 100vh;

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

const CreateBuilding = () => {
  const loader = useTabLoader();
  const { handleGoBack } = useNavs();
  const goBack = () => handleGoBack({ fallback: "buildings" });

  const onSuccess = () => {
    toast.success("La casa ha sido creada");
    goBack();
  };

  const onLoginError = (error: ApiError) => toast.error(error.message);

  const createMutation = useCrateBuilding({
    onSuccess: onSuccess, // ✅ Redirect after success
    onError: onLoginError,
  });

  const [name, setName] = useState<string>(""); // ✅ Ensured state is properly initialized

  const handleCreateBuilding = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debouncedCrate();
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
        <h1>Crear nueva casa</h1>
        <form className="modal-create" onSubmit={handleCreateBuilding}>
          <div className="inputs">
            <label htmlFor="name">Nombre de la casa</label>
            <input
              required
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

export default CreateBuilding;
