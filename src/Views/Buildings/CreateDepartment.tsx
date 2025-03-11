import { Modal } from "../../components";
import styled from "styled-components";
import { useMemo, useState } from "react";
import {
  useCreateDepartment,
  useDepartmentsTypes,
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

const CreateDepartment = () => {
  const loader = useTabLoader();
  const { buildingId } = useRouteParams<{ buildingId?: string }>();
  const { handleGoBack } = useNavs();

  const {
    data: departmentsTypes,
    isLoading,
    error: departmentTypesError,
  } = useDepartmentsTypes();

  const firstState = useMemo(() => {
    if (departmentsTypes?.data[0].id) {
      return departmentsTypes?.data[0].id;
    }
    return 1;
  }, [departmentsTypes]);

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
  const [typeDepartment, setTypeDepartment] = useState<number>(firstState);

  const handleCreateBuilding = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createDebounced();
  };

  const createDebounced = useDebouncedCallback(() => {
    if (!typeDepartment) return;
    loader.start();
    createMutation.mutate({
      building_id: Number(buildingId),
      department_type_id: typeDepartment,
    });
    loader.complete();
  }, 500);

  if (departmentTypesError) return <h1>Error loading department types</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <StyledCreateBuilding>
      <Modal isOpen onClose={goBack} className="fade-in">
        <h2>Agregar Nuevo departamento</h2>
        <form className="modal-create" onSubmit={handleCreateBuilding}>
          <div className="inputs">
            <label htmlFor="dep_type">Tipo de departamento</label>
            <select
              name="dep_type"
              id="dep_type"
              onChange={(e) => setTypeDepartment(Number(e.target.value))}
              value={typeDepartment}
            >
              {departmentsTypes?.data.map((type) => (
                <option key={type.id} value={type.id}>
                  {`${type.bedrooms} recámara(s) con ${type.bathrooms} baño(s)`}
                </option>
              ))}
            </select>
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
