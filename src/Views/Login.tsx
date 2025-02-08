import styled from "styled-components";
import { Container, Card } from "../components";
import { useState } from "react";
import { useLoginMutation, useTabLoader } from "../hooks";
import { useDebouncedCallback } from "use-debounce";
import { ApiError } from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const StyledLogin = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  margin-top: -50px;

  .login-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .password-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .toggle-password {
    position: absolute;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.accent};
    transition: color 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.accentHover};
    }
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const loader = useTabLoader();
  const navigate = useNavigate(); // ✅ React Router navigation

  const onLoginError = (error: ApiError) => toast.error(error.message);
  const onLoginSuccess = () => navigate("/");

  const loginMutation = useLoginMutation({
    onError: onLoginError,
    onSuccess: onLoginSuccess,
  });

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debouncedLogin();
  };

  const debouncedLogin = useDebouncedCallback(() => {
    if (!email || !password) return;
    loader.start();
    loginMutation.mutate({ email, password });
    loader.complete();
  }, 500);

  return (
    <StyledLogin>
      <Container className="login-container">
        <Card>
          <h1>Inicio de sesión</h1>
          <StyledForm onSubmit={login}>
            <div>
              <label htmlFor="email">Correo electrónico</label>
              <input
                required
                type="text"
                id="email"
                placeholder="Escribe tu correo electrónico"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <div className="password-container">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Escribe tu contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div>
              <button disabled={loginMutation.isPending} type="submit">
                Iniciar Sesión
              </button>
            </div>
          </StyledForm>
        </Card>
      </Container>
    </StyledLogin>
  );
};

export default Login;
