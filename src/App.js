import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";

function App() {

    const [state, setState] = useState({
        posts: [],
        tabs: [],
        active: 0
    })

    const getData = useCallback(async () => {
        let request = `http://localhost:4000/getposts`;
        const posts = await axios.get(request);
        request = `http://localhost:4000/getpost?id=${state.active}`;
        const tabs = await axios.get(request);

        setState((prev) => {
            return {
                ...prev,
                posts: posts,
                tabs: tabs
            }
        })
    }, [state.active])

    useEffect(() => {
        getData()
    }, [getData]);


    return (
        <div className="App">

        </div>
    );
}

export default App;
