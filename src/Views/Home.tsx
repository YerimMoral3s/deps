// import { Container } from "../components";

import axiosInstance from "../api/axios";

const Home = () => {
  const dosomenthig = async () => {
    const reponse = await axiosInstance.get("/auth/test");
    console.log(reponse);
  };

  return (
    <>
      <button type="button" onClick={dosomenthig}>
        test
      </button>
      <h1>Welcome</h1>
      <h2>Welcome</h2>
      <h3>Welcome</h3>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut vitae
        libero delectus iusto deleniti optio qui eaque quaerat temporibus
        eligendi velit, inventore ut iste a, dicta fugiat? Quos, harum maxime.
      </p>
      <div></div>
    </>
  );
};

export default Home;
