import { Link } from "react-router-dom";
import config from "../config/config.json";

interface Config {
    Abbreviations: { [key: string]: string }
}

interface Props {
    links : {[key: string]: any}
}

const IndexTable = ({links} : Props) => {
    return (
        <div className="w-[90%] md:w-[60%] rounded-xl border border-[#FFF6E9] p-5 md:p-7 text-[#FFF6E9]">
            <h2 className="text-[16px] md:text-[20px] text-md underline decoration-[#FF7F3E]">Available Routes</h2>
            {Object.keys(links).length === 0 ?
                <p className="m-2 text-sm md:text-md">No Routes Available</p>
            :
                <ul className="ml-5 list-disc">
                    {Object.keys(links).map((link) =>
                        <li key={link} className="my-1 text-[#FF7F3E]">
                            <Link key={link} to={`/link/${link}`} className="inline-block text-[#FFF6E9] transition-transform hover:transform hover:scale-[110%] hover:translate-x-5 duration-300">{(config as Config).Abbreviations[link]}</Link>
                        </li>
                    )}
                </ul>
            }
        </div>
    )
}

export default IndexTable
