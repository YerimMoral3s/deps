import { useEffect } from "react";
import { useTabLoader } from "../hooks";

export default function LoaderView() {
  const loader = useTabLoader();
  useEffect(() => {
    loader.start();
    return loader.complete();
  }, []);
  return <div></div>;
}
