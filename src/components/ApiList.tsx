import { useContext } from "react";
import { MSWContext } from "./MSWContext";
import { Box, NavLink, Title } from "@mantine/core";
import { IconClick } from "@tabler/icons-react";
import { useNavigate } from "react-router";

export const ApiList: React.FC = () => {
  const { handlers } = useContext(MSWContext);
  const navigate = useNavigate();

  return (
    <Box>
      <Title order={5}>Select an api</Title>
      {handlers.map((api) => (
        <NavLink
          key={api.info.header}
          label={api.info.header}
          rightSection={<IconClick />}
          onClick={() => navigate(`/${api.info.method}${api.info.path}`)}
        />
      ))}
    </Box>
  );
};
