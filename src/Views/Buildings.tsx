import { useCrateBuildings } from "../hooks";

export default function Buildings() {
  const build = useCrateBuildings({
    onError: (e) => console.log("aca MSG", e.message),
    onSuccess: (e) => console.log("aca succ", e.data),
  });

  return (
    <div>
      <button type="button" onClick={() => build.mutate("PRUEBA1")}>
        crear
      </button>
    </div>
  );
}
