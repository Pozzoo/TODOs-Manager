import {useContext} from "react";
import ListRendererContext from "../context/ListRenderProvider.tsx";

const useListProvider = () => {
    const context = useContext(ListRendererContext);

    if (!context) {
        throw new Error("useRenderOrder must be used within a WindowProvider");
    }

    return context;
}

export default useListProvider;