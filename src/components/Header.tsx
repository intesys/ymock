import { IconRestore } from "@tabler/icons-react";

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="title">yMock dashboard</div>
      <div className="tools">
        <button title="Restore initial mocks">
          <IconRestore />
        </button>
      </div>
    </div>
  );
};
