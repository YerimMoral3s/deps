import { useNavs } from "../../hooks";

export default function Building() {
  const { navigateTo } = useNavs();
  const goBack = () => navigateTo({ route: "BUILDINGS" });
  return (
    <div>
      <button onClick={goBack}> return </button>
    </div>
  );
}
