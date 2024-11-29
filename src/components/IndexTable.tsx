
interface Props {
    connections : {[key: string]: any}
}

const IndexTable = ({connections} : Props) => {
    return (
        <div className="w-[90%] md:w-[60%] rounded-xl border border-[#FFF6E9] p-5 md:p-7 text-[#FFF6E9]">
            <h2 className="text-md md:text-lg">Available Routes</h2>
            {}
        </div>
    )
}

export default IndexTable
