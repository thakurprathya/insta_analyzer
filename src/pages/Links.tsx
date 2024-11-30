import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from "../config/config.json";

interface Config {
    Abbreviations: { [key: string]: string }
}

interface Props {
    links : {[key: string]: any}
}

const Links = ({links} : Props) => {
    const { id } = useParams();

    const ExtractUsername = (link: string): string => {
        const username = link.split('instagram.com/')[1];
        return username;
    }

    useEffect(()=>{
        scrollTo(0, 0);
    },[])

    return (
        <div className='flex flex-col items-center p-10'>
            <h1 className="font-bold text-xl md:text-2xl text-[#FFF6E9]">{id && (config as Config).Abbreviations[id] + " " + "(" + (id && links[id] ? links[id].length : 0) + ")" }</h1>
            <ul className="mt-10 list-disc w-[95%] md:w-[60%] rounded-xl border border-[#FFF6E9] p-5 md:p-7 text-[#FFF6E9]">
                {Object.keys(links).length === 0 ?
                    <li className="text-sm md:text-md text-[#FF7F3E]">
                        <p className='text-[#FFF6E9]'>No Routes Available</p>
                    </li>
                :
                    id && links[id] ? links[id].map((link: string) =>
                        <li key={link} className="my-1 text-[#FF7F3E]">
                            <a key={link} target='__blank' href={link} className="cursor-pointer inline-block text-[#FFF6E9] transition-transform hover:transform hover:scale-[110%] hover:translate-x-5 duration-300">{ExtractUsername(link)}</a>
                        </li>
                    ) : null
                }
            </ul>
        </div>
    )
}

export default Links
