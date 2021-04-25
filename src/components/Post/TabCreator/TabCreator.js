import React, {useCallback, useState} from 'react';
import classes from "./TabCreator.module.scss";

const TabCreator = ({post_id, addTextTab}) => {

    const [state, setState] = useState({
        clicked: -1
    })


    const click = (tab) => {
        setState(prev => {
            return {
                ...prev,
                clicked: tab,
                text: ""
            }
        })
    }

    const onType = useCallback((event) => {

        const value = event.target.value;
        event.target.style.height = '220px';
        event.target.style.height = event.target.scrollHeight + 'px';
        setState(prev => {
            return {
                ...prev,
                text: value
            }
        })
    }, [])


    return (
        <div className={classes.Tab}>
            {state.clicked === -1 ?
                <>
                    <div className={classes.Add + " " + classes.full} onClick={() => {
                        click(0)
                    }}>
                        +
                    </div>
                </>
                :
                state.clicked === 0 ?
                    <>
                        <div className={classes.Add} onClick={() => {
                            click(1)
                        }}>
                            text
                        </div>
                        <div className={classes.Add} onClick={() => {
                            click(2)
                        }}>
                            img
                        </div>
                    </>
                    : state.clicked === 1 ?
                    <div className={classes.Form}>
                        <textarea onChange={event => onType(event)}/>
                        <input type={"submit"} value={"+"} onClick={() => {
                            if (state.text !== "") {
                                addTextTab(post_id, state.text)
                                setState(prev => {
                                    return {
                                        ...prev,
                                        text: "",
                                        clicked: -1
                                    }
                                })
                            }
                        }
                        }/>
                    </div>
                    :
                    <></>

            }
        </div>
    );
}
;

export default TabCreator;