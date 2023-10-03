import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { MSWContext } from "./MSWContext";

export const ApiList: React.FC = () => {
  const { handlers } = useContext(MSWContext);
  const [handlerList, setHandlerList] = useState(handlers);
  const navigate = useNavigate();

  const filterApi: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const searchFor = new RegExp(event.target.value);
    setHandlerList(
      handlers.filter((el) => searchFor.test(el.info.path as string))
    );
  };

  return (
    <div className="api-list">
      <div className="title">Select an api</div>
      <input
        className="search"
        type="text"
        placeholder="Search"
        onChange={filterApi}
      />
      <ul>
        {handlerList.map((api) => (
          <li key={api.info.header}>
            <a onClick={() => navigate(`/${api.info.method}${api.info.path}`)}>
              <span className="method">{api.info.method as string}</span>
              <span className="path">{api.info.path as string}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
