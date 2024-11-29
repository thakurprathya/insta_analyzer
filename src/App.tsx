import { useEffect, useState } from "react"
import { FileUpload } from "./components/FileUpload"
import IndexTable from "./components/IndexTable"

const App = () => {
    const [connections, setConnections] = useState({});

    useEffect(()=>{console.log(connections)},[connections])

    return (
        <div className="flex flex-col items-center justify-center p-7 md:p-10 gap-10">
            <h1 className="font-bold text-xl md:text-2xl text-[#FFF6E9]">Instagram Connection Analyzer</h1>
            <FileUpload setConnections={setConnections}/>
            <IndexTable connections={connections}/>
        </div>
    )
}

export default App
