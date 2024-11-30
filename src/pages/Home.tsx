import { FileUpload } from "../components/FileUpload"
import IndexTable from "../components/IndexTable"

interface Props {
    links : {[key: string]: any}
    setLinks: React.Dispatch<React.SetStateAction<{[key: string]: any}>>;
}

const Home = ({links, setLinks} : Props) => {
    return (
        <div className="flex flex-col items-center justify-center p-7 md:p-10 gap-10">
            <h1 className="font-bold text-xl md:text-2xl text-[#FFF6E9]">Instagram Connection Analyzer</h1>
            <FileUpload setLinks={setLinks}/>
            <IndexTable links={links}/>
        </div>
    )
}

export default Home
