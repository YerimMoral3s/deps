import { create } from "zustand";
import { Building } from "../../../api/Buildings";
import { Department } from "../../../api/departments";
import { Tenant } from "../../../api/Tenants";
import { Lease } from "../../../api/Leases";

type steps =
  | "selectBuilding"
  | "selectDepartment"
  | "createTenant"
  | "createLease"
  | "confirmation"
  | "success"
  | undefined;

type Store = {
  step: steps;
  building: Building | undefined;
  department: Department | undefined;
  tenant: Partial<Tenant> | undefined;
  lease: Partial<Lease> | undefined;
};

type Actions = {
  setBuilding: (building: Building) => void;
  setDepartment: (dep: Department) => void;
  setStep: (step: steps) => void;
  setTenant: (tenant: Partial<Tenant>) => void;
  setLease: (lease: Partial<Lease>) => void;
  reset: () => void;
};

const state: Store = {
  building: undefined,
  department: undefined,
  step: undefined,
  tenant: undefined,
  lease: undefined,
};

export const useAddNewTenantStore = create<Store & Actions>((set) => ({
  ...state,
  setBuilding: (building: Building) => set({ building }),
  setDepartment: (department: Department) => set({ department }),
  setStep: (step: steps) => set({ step }),
  setTenant: (tenant: Partial<Tenant>) => set({ tenant }),
  setLease: (lease: Partial<Lease>) => set({ lease }),
  reset: () => set(state),
}));
