interface Props {
    links : {[key: string]: any}
}

const IndexTable = ({links} : Props) => {
    console.log(links, Object.keys(links).length)
    return (
        <div className="w-[90%] md:w-[60%] rounded-xl border border-[#FFF6E9] p-5 md:p-7 text-[#FFF6E9]">
            <h2 className="text-[16px] md:text-[20px] text-md">Available Routes</h2>
            {Object.keys(links).length === 0 ?
                <p className="m-2 text-sm md:text-md">No Routes Available</p>
            :
                // Object.keys(links).map((link) => )
                <></>
            }
        </div>
    )
}

export default IndexTable
