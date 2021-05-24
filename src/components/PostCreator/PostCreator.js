import React, {useCallback, useRef, useState} from 'react';
import classes from "./PostCreator.module.scss";

const PostCreator = ({addPost}) => {

    const [state, setState] = useState({
        text: ""
    })

    const textRef = useRef();

    const onType = useCallback((event) => {
        const value = event.target.value;
        setState(prev => {
            return {
                ...prev,
                text: value
            }
        })
    }, [])

    return (
        <div className={classes.MiniPost}>
            <form onSubmit={(event) => {
                event.preventDefault()
                if (state.text !== "") {
                    addPost(state.text)
                    textRef.current.value = "";
                    setState((prev) => {
                        return {
                            ...prev,
                            text: ""
                        }
                    })
                }
            }}>
                <input type={"text"} name={"title"} onChange={event => onType(event)} ref={textRef}/>
                <input hidden={true} type={"submit"} name={"create"} value={"+"}/>
            </form>
        </div>
    );
};

export default PostCreator;