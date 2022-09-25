import { ListenableVarListen } from "@mdos-san/listenable-variable";
import { useEffect, useState } from "react";

const useListenable = <T>(watcher: ListenableVarListen<T>, defaultValue: T) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => watcher(setValue));

  return value;
};

export default useListenable;
