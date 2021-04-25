import React, {useCallback, useRef, useState} from 'react';
import classes from "./PostCreator.module.scss";

const PostCreator = ({swapActive, addPost}) => {

    const [state, setState] = useState({
        text: ""
    })

    const onType = useCallback((event)=>{
        const value = event.target.value;
        setState(prev => {
            return{
                ...prev,
                text: value
            }
        })
    },[])

    return (
        <div className={classes.PostWrap}>
            <div className={classes.Post}>
                <input type={"text"} name={"title"} onChange={event => onType(event)}/>
                <input type={"submit"} name={"create"} value={"+"} onClick={()=>{
                    if (state.text !== "") {
                        addPost(state.text)
                        setState((prev) => {
                            return {
                                ...prev,
                                text: ""
                            }
                        })
                    }
                }}/>
            </div>
        </div>
    );
};

export default PostCreator;