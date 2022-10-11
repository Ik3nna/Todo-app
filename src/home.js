import react, { useState, useEffect } from "react";

const Home = ()=> {
    const [name, setName] = useState("");
    const [list, setList] = useState([]);


    const handleSubmit = (e)=> {
        e.preventDefault();
        const newName = {id: new Date().getTime().toString(), title: name};
        setList([...list, newName]);
        setName("");
    }

    const removeTodo = (id) => {
        let newList = list.filter((item)=> item.id !== id);
        setList(newList);
    }

    const clearCompleted = ()=> {

    }

    return(
        <main className="top" style={{ 
            backgroundImage: `url(${process.env.PUBLIC_URL + '/images/bg-desktop-dark.jpg'})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "50vh"
            }}>
            <section>
                <article className="text">
                    <h1>TODO</h1> 

                    <span>
                        <img src="/images/icon-sun.svg" />
                    </span>
                </article>
            
            
                <form onSubmit={handleSubmit}>
                    <div className="circle"></div>
                    <input type="text"
                        value={name} 
                        placeholder="Create a new todo..."
                        onChange={(e)=>setName(e.target.value)} 
                    />
                </form>

                <article className="form-list" style={{ display: list.length===0 ? "none": "block" }}>
                    {list.map((item)=>{
                        const { id, title } = item;
                        return(
                            <>
                                <div key={id} className="list">
                                    <div className="circle"></div> {title} 
                                    <img src="/images/icon-cross.svg" onClick={()=>removeTodo(id)} />
                                </div><hr />
                            </>
                        );
                    })}

                    <div className="end">
                        <p>{list.length} items left</p>
                        <p className="all">All</p>
                        <p>Active</p>
                        <p>Completed</p>
                        <p onClick={clearCompleted}>Clear Completed</p>
                    </div>
                </article>

                <div className="sm-screen" style={{ visibility: list.length===0 ? "hidden": "visible" }}>
                    <p className="all">All</p>
                    <p>Active</p>
                    <p>Completed</p>
                </div>
                    
                <p className="para">
                    Drag and drop to reorder list
                </p>

            </section>
        </main>
    );
}

export default Home;