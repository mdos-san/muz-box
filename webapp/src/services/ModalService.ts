import ListenableVar from "@mdos-san/listenable-variable";
import React from "react";

const ModalService = () => {
  const [, setComponent, listenComponent] =
    ListenableVar<null | React.ReactNode>(null);

  const [, setIsOpen, listenIsOpen] = ListenableVar<boolean>(false);

  const setComponentAndOpen = (component: React.ReactNode) => {
    setComponent(component);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setComponent(null);
  };

  return {
    close,
    listenComponent,
    listenIsOpen,
    setComponentAndOpen,
  };
};

export default ModalService;
