import { Dots, Modal } from "../../../components";
import styled from "styled-components";

import { useEffect } from "react";
import { useAddNewTenantStore } from "./Store";
import { useBuilding, useNavs, useRouteParams } from "../../../hooks";
import SelectBuilding from "./SelectBuilding";
import SelectDepartment from "./SelectDepartment";
import NewTenant from "./NewTenant";
import CreateLease from "./CreateLease";
import Confirmation from "./Confirmation";
import Success from "./Success";

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
  const newTenantStore = useAddNewTenantStore();
  const { buildingId } = useRouteParams<{ buildingId?: string }>();
  const { handleGoBack } = useNavs();
  const building = useBuilding(buildingId);

  const goBack = () => {
    if (buildingId) {
      handleGoBack({ fallback: "building", props: { buildingId: buildingId } });
      return;
    }

    handleGoBack();
  };

  useEffect(() => {
    if (building?.data?.data) {
      newTenantStore.setBuilding(building.data.data);
      newTenantStore.setStep("selectDepartment");
    } else {
      newTenantStore.setStep("selectBuilding");
    }

    return () => {
      newTenantStore.reset();
    };
  }, [building?.isLoading]);

  console.log("render", newTenantStore);

  return (
    <StyledCreateBuilding>
      <Modal isOpen onClose={goBack} className="fade-in">
        {building?.isLoading ? (
          <Dots />
        ) : (
          <>
            <h2>Agregar Inquilino</h2>

            <div className="body">
              {newTenantStore.step === "selectBuilding" && <SelectBuilding />}
              {newTenantStore.step === "selectDepartment" && (
                <SelectDepartment />
              )}
              {newTenantStore.step === "createTenant" && <NewTenant />}
              {newTenantStore.step === "createLease" && <CreateLease />}
              {newTenantStore.step === "confirmation" && <Confirmation />}
              {newTenantStore.step === "success" && <Success />}
            </div>
          </>
        )}
      </Modal>
    </StyledCreateBuilding>
  );
};

export default AddNewTenant;
