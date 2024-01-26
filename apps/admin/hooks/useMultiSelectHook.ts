import { useState } from "react";

const useMultiSelectHook = (initialValue: Array<any>): [Array<any>, (val: string) => void] => {
    const [checkedValues, setCheckedValue] = useState(initialValue);
    const updateCheckValue = (val: string) => setCheckedValue([...checkedValues, val]);
    return [checkedValues, updateCheckValue];
}

export default useMultiSelectHook;