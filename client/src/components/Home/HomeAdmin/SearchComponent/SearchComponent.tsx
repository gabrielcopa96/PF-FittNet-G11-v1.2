import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// @ts-expect-error TS(2307): Cannot find module './styles/stylesSearch.module.c... Remove this comment to see the full error message
import style from './styles/stylesSearch.module.css'


export default function SearchComponent () {
    const [ search, setSearch ] = useState('');
    const [ searchResult, setSearchResult ] = useState([]);   
    const [focus, setFocus] = useState(false);  
    
    // Me copio el estado de estado global (name y _id)
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    let partners = useSelector((state) => state.partners);
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    let users = useSelector((state) => state.users);

    
    // Acoto la info para tener solo lo que necesito
    partners = partners.length > 0 ? partners.map((p: any) => {
        return { name: p.name, id: p._id, type: p.type, userName: p.userName}
    }) : [] ;

    users = users.length > 0 ? users.map((u: any) => {
        return { name: u.name, id: u._id, type: u.type, userName: u.userName}
    }) : [] ;
      
    
    let usersApp = partners.concat(users);
    

    function searchLocalUser (name: any) {
        // Llega el valor de la búsqueda por argumento
        let filterByName: any = [];
        let filterByUserName = [];

        if (name === "") {
            filterByName = []
        }

        if (name !== "") {
            filterByName = searchResult.length ? [...searchResult] : [...usersApp];
            // @ts-expect-error TS(7006): Parameter 'n' implicitly has an 'any' type.
            filterByName = filterByName.filter(n => n.name.toLowerCase().includes(name.toLowerCase()))
            // busco por name (nombre)
            filterByUserName = searchResult.length ? [...searchResult] : [...usersApp];
            filterByUserName = filterByUserName.filter(e => e.userName.toLowerCase().includes(name.toLowerCase()))
            // busco por userName (email)
            filterByName = filterByName.concat(filterByUserName);
            // uno los resultados de las búsquedas
            filterByName = [...new Set (filterByName)];
            // hago que el array tenga solo elementos únicos y no repetidos 

            if (filterByName.length > 10) {
                filterByName = filterByName.slice(0, 10)
            }            
        }
        return setSearchResult(filterByName);        

    }
    
    function onInputChange (e: any) {
        setSearch(e.target.value)
        
        // Ejecuto una acción en el local pasandole el valor de la búsqueda
        searchLocalUser(search);

    }

    
    function focusSearch() { // Solamente un switch on/off
        // @ts-expect-error TS(2304): Cannot find name 'setTimeout'.
        setTimeout(function(){           
            if (focus === false) {
                setFocus(true)                
            }
            if (focus === true) {
                setFocus(false)
            }           
        }, 500);        
    }
    //    /profile/:type/:name/:userId
    
    return (
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div id = "main-box-search-nano" className={style.containerSearch}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <div id = "div-search-nano">               
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <form onFocus={()=>focusSearch()} onBlur={()=>focusSearch()} id = "search-nano-nano">
                    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                    <input id='input-search-nano' type="text" onChange={(e) => onInputChange(e)} 
                    value= {search} autoComplete='off' spellCheck="false"
                    placeholder='Buscar por nombre... ' className={style.inputSearch}
                    />                   
                </form>                   
            </div>

            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <div id = "div-list-nano" className={style.divListNano} >
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <ul id = 'list-search-nano'>
                { focus && searchResult ? searchResult.map ((g) => {
                    return (
                        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                        <Link to = {g.type === "partner" ? `/profile/partner/${g.name}/${g.id}`
                                    // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
                                    : `/profile/user/${g.name}/${g.id}` } key={g.id} >

                            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                            <li className={style.listSearch}>{g.name}, {g.userName}</li>
                        </Link>    
                    )
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                }) : <div id='id-nano'></div>}
                </ul>
            </div>
           
        </div>
    )

}

