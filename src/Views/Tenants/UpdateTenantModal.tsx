import styled from "styled-components";
import { Modal } from "../../components";
import { Tenant } from "../../api/Tenants";
import { useEffect, useState } from "react";
import { useUpdateTenant } from "../../hooks/useUpdateTenant";
import toast from "react-hot-toast";
import { ApiError } from "../../api/axios";

const StyledUpdatedTenant = styled.div`
  h2 {
    color: ${({ theme }) => theme.colors.accent};
  }
  .items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
`;

export const UpdateTenantModal = (props: {
  isOpen: boolean;
  onClose: () => void;
  tenant: Tenant | undefined;
}) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const onSuccess = () => {
    toast.success("Inquilino actualizado correctamente");
  };

  const onLoginError = (error: ApiError) => toast.error(error.message);

  useEffect(() => {
    if (props.tenant) {
      setForm({
        first_name: props.tenant.first_name,
        last_name: props.tenant.last_name,
        email: props.tenant.email || "",
        phone: props.tenant.phone,
      });
    }
  }, [props.tenant]);

  const mutation = useUpdateTenant({
    onError: onLoginError,
    onSuccess: onSuccess,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!props.tenant) return;

    mutation.mutate({
      tenant_id: props.tenant.id,
      data: form,
    });
  };

  if (!props.tenant) return null;

  return (
    <StyledUpdatedTenant>
      <Modal isOpen={props.isOpen} onClose={props.onClose} className="fade-in">
        <h2>Editar inquilino</h2>

        <form className="items" onSubmit={handleSubmit}>
          <div className="item">
            <label htmlFor="phone">Numero de teléfono</label>
            <input
              type="text"
              id="phone"
              required
              value={form.phone}
              disabled
            />
          </div>

          <div className="item">
            <label htmlFor="first_name">Primer Nombre</label>
            <input
              type="text"
              id="first_name"
              required
              value={form.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label htmlFor="last_name">Apellido</label>
            <input
              type="text"
              id="last_name"
              required
              value={form.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="actions">
            <button type="button" onClick={props.onClose}>
              Cerrar
            </button>
            <button type="submit" disabled={mutation.isPending}>
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </StyledUpdatedTenant>
  );
};
