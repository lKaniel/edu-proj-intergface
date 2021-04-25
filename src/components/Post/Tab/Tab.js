import React, {useCallback, useState} from 'react';
import classes from "./Tab.module.scss"

const Tab = ({data, type, id, removeTab}) => {

    const [state, setState] = useState({
        clicked: false
    })

    const changeClick = useCallback(() => {
        setState((prev) => {
            return {
                ...prev,
                clicked: !prev.clicked
            }
        })
    }, [])

    const tabCls = [classes.Tab];
    tabCls.push(classes.text);
    if (state.clicked) {
        tabCls.push(classes.clicked)
    }

    if (type === 1) return (
        <div className={tabCls.join(" ")} onClick={changeClick}>
            <div className={classes.Text}>
                {data}
            </div>
            {
                !state.clicked
                    ? null
                    : <div className={classes.Remove} onClick={()=>{removeTab(id)}}>Remove</div>
            }
        </div>
    );

    return (
        <div>

        </div>
    );
};

export default Tab;