import {useContext} from "react";
import TaskRendererContext from "../context/TaskRenderProvider.tsx";

const useTaskProvider = () => {
    const context = useContext(TaskRendererContext);

    if (!context) {
        throw new Error("useRenderOrder must be used within a WindowProvider");
    }

    return context;
}

export default useTaskProvider;