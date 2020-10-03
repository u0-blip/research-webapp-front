import React, { createContext } from "react";

const secContext = createContext({
    name: null,
    changeName: null
});

export default secContext;