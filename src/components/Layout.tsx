import { AppShell, Burger, Flex, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Icon24Hours } from "@tabler/icons-react";
import { Outlet } from "react-router-dom";
import { ApiList } from "./ApiList";

export const Layout: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Flex
          gap="md"
          justify="flex-start"
          align="stretch"
          direction="row"
          wrap="wrap"
          style={{
            height: 60,
            lineHeight: 60,
            paddingLeft: 16,
          }}
        >
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            style={{ height: 60, lineHeight: 60 }}
          />
          <Title style={{ lineHeight: "60px", fontSize: "20px" }}>
            yMock dashboard
          </Title>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ApiList />
      </AppShell.Navbar>

      <AppShell.Main>
        Main
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
