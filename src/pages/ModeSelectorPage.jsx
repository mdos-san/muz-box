import { Services, Button, Center, Separator, Sizer } from "@sharpmds/core";

const ModeSelectorPage = () => {
  return (
    <Center>
      <img className="logo" src="logo-muzbox.svg" alt="MuzBox" />
      <Separator margin="32px 0 0 0">
        <Button onClick={() => Services.router.setPage("room")}>
          Creer une Muz-Box
        </Button>
        <Button className="button--inverted">Rejoindre une Muz-Box</Button>
      </Separator>
    </Center>
  );
};

export default ModeSelectorPage;
