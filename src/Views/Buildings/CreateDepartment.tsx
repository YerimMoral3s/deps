import { Modal } from "../../components";
import styled from "styled-components";
import { useState } from "react";
import {
  useCreateDepartment,
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
    gap: 1rem;
    .create-inputs {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .buttons {
      display: flex;
      align-items: flex-end;
      justify-content: end;
    }
  }
`;

const CreateDepartment = () => {
  const loader = useTabLoader();
  const { buildingId } = useRouteParams<{ buildingId?: string }>();
  const { handleGoBack } = useNavs();

  const goBack = () => {
    if (buildingId) {
      handleGoBack({ fallback: "building", props: { buildingId } });
    }
  };

  const onSuccess = () => {
    toast.success("El departamento ha sido agregado");
    goBack();
  };

  const onError = (error: ApiError) => toast.error(error.message);
  const createMutation = useCreateDepartment({ onSuccess, onError });
  const [bedrooms, setBedrooms] = useState<number | "">("");
  const [bathrooms, setBathrooms] = useState<number | "">("");
  const [baseRentPrice, setBaseRentPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleCreateBuilding = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createDebounced();
  };

  const createDebounced = useDebouncedCallback(() => {
    if (!bedrooms || !bathrooms) return;
    loader.start();
    createMutation.mutate({
      building_id: Number(buildingId),
      status: "disponible",
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      base_rent_price: baseRentPrice || null,
      description: description || null,
    });
    loader.complete();
  }, 500);

  return (
    <StyledCreateBuilding>
      <Modal isOpen onClose={goBack} className="fade-in">
        <h2>Agregar Nuevo departamento</h2>
        <form className="modal-create" onSubmit={handleCreateBuilding}>
          <div className="create-inputs">
            <div className="create-input">
              <label htmlFor="bedrooms">Recámaras</label>
              <input
                type="number"
                id="bedrooms"
                value={bedrooms}
                onChange={(e) =>
                  setBedrooms(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                required
              />
            </div>
            <div className="create-input">
              <label htmlFor="bathrooms">Baños</label>
              <input
                type="number"
                id="bathrooms"
                value={bathrooms}
                onChange={(e) =>
                  setBathrooms(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                required
              />
            </div>
            <div className="create-input">
              <label htmlFor="baseRentPrice">Precio Base de Renta</label>
              <input
                type="number"
                id="baseRentPrice"
                value={baseRentPrice}
                onChange={(e) => setBaseRentPrice(e.target.value)}
              />
            </div>
            <div className="create-input">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="buttons">
            <button
              style={{ marginRight: "1rem" }}
              type="submit"
              disabled={createMutation.isPending}
            >
              Crear
            </button>
            <button type="button" className="secondary-button" onClick={goBack}>
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </StyledCreateBuilding>
  );
};

export default CreateDepartment;
