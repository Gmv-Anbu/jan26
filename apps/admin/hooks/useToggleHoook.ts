import { useState } from "react";

const useToggleHoook = (initialValue: boolean): [boolean, (val: boolean) => void] => {
    const [toggle, setToggle] = useState(initialValue);
    const toggleValue = (val: boolean) => setToggle(!val);
    return [toggle, toggleValue];
}

export default useToggleHoook;